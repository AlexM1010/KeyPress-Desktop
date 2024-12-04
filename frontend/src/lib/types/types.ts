//Modified by alex 
export enum Platform {
	GitHub = 'github',
	StackOverflow = 'stackoverflow',
	Twitter = 'twitter',
	Linkedin = 'linkedin',
	Email = 'email',
	Facebook = 'facebook',
	Youtube = 'youtube'
}

export type Icon = `i-${string}-${string}`;

export type Asset = string | { light: string; dark: string };

export interface Item<S extends string = string> {
	slug: S;
	name: string;
	logo: Asset;
	shortDescription: string;
	description: string;
	screenshots?: Array<{ src: string; label: string }>;
}

export interface Link {
	to: string;
	label: string;
	newTab?: boolean;
}

export interface IconLink extends Link {
	icon: Asset;
}

//TODO: update below
export interface SkillCategory<S extends string = string> {
	slug: S;
	name: string;
}

export interface Skill<S extends string = string> extends Omit<Item<S>, 'shortDescription'> { 
	color: string;
	category?: SkillCategory;
}

export interface Project<S extends string = string> extends Item<S> {
	links: Array<Link>;
	color: string;
	period: {
		from: Date;
		to?: Date;
	};
	type: string;
	skills: Array<Skill<S>>;
}

// TODO: Finish new types
export enum NodeType {
    Start = 'start',
	Click = 'click',
	Move = 'move',
	Wait = 'wait'
}

export enum NodeCategory {
    Input = 'input',
    Process = 'process', 
    Output = 'output',
    Decision = 'decision',
    Storage = 'storage',
    Connector = 'connector'
}

export enum NodePremium {
	Free = 'free',
	Premium = 'premium',
	AI = 'ai'
}

export interface Node<S extends string = string> extends Omit<Item<S>, 'shortDescription'> {
    nodeType: NodeType;
    category?: NodeCategory;
	premium?: NodePremium;
}

export interface FlowReview<S extends string = string> extends Omit<Item<S>, 'shortDescription'> {
    FlowRating?: 1 | 2 | 3 | 4 | 5; // 1-5 star average user rating
    FlowReviewSummary?: string; // LLM review summary - Periodically updated
    FlowVerified?: boolean; // Verified safe to use by Me/Team/LLM
    FlowVersionsVerified?: Array<number>; // Which versions have been verified 
}

export interface Flow<S extends string = string> extends Item<S> {
	links: Array<Link>;
	color: string;
	period: {
		from: Date;
		to?: Date;
	};
	type: string;
	nodes?: Array<Node<S>>;
	reviews?: FlowReview<S>;
	downloads?: number;
	price?: number;
}