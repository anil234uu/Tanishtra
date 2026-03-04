import dynamic from 'next/dynamic';

const sectionComponents: Record<string, any> = {
    'hero': dynamic(() => import('./HeroSection')),
    'announcementBar': dynamic(() => import('./AnnouncementBarSection')),
    'socialProofTicker': dynamic(() => import('./SocialProofTickerSection')),
    'categoryGrid': dynamic(() => import('./CategoryGridSection')),
    'productShowcase': dynamic(() => import('./ProductShowcaseSection')),
    'testimonialSlider': dynamic(() => import('./TestimonialSliderSection')),
    'editorialBanner': dynamic(() => import('./EditorialBannerSection')),
    'processSteps': dynamic(() => import('./ProcessStepsSection')),
    'collectionBanner': dynamic(() => import('./CollectionBannerSection')),
    'trustFeatures': dynamic(() => import('./TrustFeaturesSection')),
    'instagramGrid': dynamic(() => import('./InstagramGridSection')),
    'newsletter': dynamic(() => import('./NewsletterSection')),
    'promoBanner': dynamic(() => import('./PromoBannerSection')),
    'richText': dynamic(() => import('./RichTextSection')),
    'imageWithText': dynamic(() => import('./ImageWithTextSection')),
    'videoSection': dynamic(() => import('./VideoSection')),
    'customHtml': dynamic(() => import('./CustomHtmlSection')),
};

export default sectionComponents;
