"use client";
import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import LeftPanel from './LeftPanel';
import RightPanelEditor from './RightPanelEditor';
import RightPanelPreview from './RightPanelPreview';
import AddSectionModal from './AddSectionModal';

export interface Section {
    id: string;
    type: string;
    enabled: boolean;
    order: number;
    settings: any;
}

export default function PageBuilderClient({ slug }: { slug: string }) {
    const [sections, setSections] = useState<Section[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    // Fetch initial data
    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await fetch(`/api/pages/${slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setSections(data.sections || []);
                }
            } catch (err) {
                console.error("Failed to load page context", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPageData();
    }, [slug]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // we PUT the entire modified sections array back
            const res = await fetch(`/api/pages/${slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sections }),
            });
            if (res.ok) {
                setHasUnsavedChanges(false);
            }
        } catch (err) {
            console.error("Failed to save", err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleReorder = (newOrder: Section[]) => {
        // assign strictly sequential orders
        const ordered = newOrder.map((sec, idx) => ({ ...sec, order: idx }));
        setSections(ordered);
        setHasUnsavedChanges(true);
    };

    const handleUpdateSection = (updatedSection: Section) => {
        setSections(prev => prev.map(sec => sec.id === updatedSection.id ? updatedSection : sec));
        setHasUnsavedChanges(true);
    };

    const handleDeleteSection = (id: string) => {
        setSections(prev => prev.filter(sec => sec.id !== id));
        if (selectedSectionId === id) setSelectedSectionId(null);
        setHasUnsavedChanges(true);
    };

    const handleAddSection = (type: string) => {
        const newId = `sec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const newSec: Section = {
            id: newId,
            type,
            enabled: true,
            order: sections.length,
            settings: {} // Defaults will be populated in editor or by registry
        };
        setSections(prev => [...prev, newSec]);
        setSelectedSectionId(newId);
        setIsAddModalOpen(false);
        setHasUnsavedChanges(true);
        setActiveTab('editor'); // ensure they see the new editor
    };

    if (isLoading) {
        return <div className="min-h-screen bg-background flex items-center justify-center text-text-secondary">Loading Page Builder...</div>;
    }

    return (
        <div className="flex flex-col h-screen w-full bg-background overflow-hidden font-inter text-text">
            <TopBar
                slug={slug}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onSave={handleSave}
                isSaving={isSaving}
                hasUnsavedChanges={hasUnsavedChanges}
                previewDevice={previewDevice}
                setPreviewDevice={setPreviewDevice}
            />

            <div className="flex flex-1 overflow-hidden h-[calc(100vh-56px)]">
                {activeTab === 'editor' && (
                    <LeftPanel
                        sections={sections}
                        selectedSectionId={selectedSectionId}
                        setSelectedSectionId={setSelectedSectionId}
                        onReorder={handleReorder}
                        onUpdateSection={handleUpdateSection}
                        onDeleteSection={handleDeleteSection}
                        onOpenAddModal={() => setIsAddModalOpen(true)}
                    />
                )}

                <main className="flex-1 bg-[#0B0B0D] overflow-y-auto relative flex flex-col">
                    {activeTab === 'editor' ? (
                        <RightPanelEditor
                            section={sections.find(s => s.id === selectedSectionId) || null}
                            onUpdate={handleUpdateSection}
                        />
                    ) : (
                        <RightPanelPreview
                            sections={sections}
                            previewDevice={previewDevice}
                        />
                    )}
                </main>
            </div>

            {isAddModalOpen && (
                <AddSectionModal
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleAddSection}
                />
            )}
        </div>
    );
}
