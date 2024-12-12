// frontend/src/lib/stores/stats.ts

import { writable, get } from 'svelte/store';

/**
 * Interface for Card Effects
 */
export interface CardEffects {
    moneyChangeFromCard: number;
    opinionChangeFromCard: number;
    riskChangeFromCard: number;
    numIPsFromCard: number;
    ipValueChangeFromCard: number;
}

/**
 * Interface for History Data (suitable for lightweight-charts LineSeries)
 */
export interface StatHistoryData {
    time: string;
    value: number;
}

/**
 * Current Stat Stores
 */
export const money = writable<number>(10000);
export const opinion = writable<number>(5);
export const risk = writable<number>(50);
export const numIPs = writable<number>(0);
export const ipValue = writable<number>(0);

// New Store to Track Accepted Cards
export const acceptedCards = writable<number>(0);

/**
 * History Stores for Each Stat
 */
export const moneyHistory = writable<StatHistoryData[]>([]);
export const opinionHistory = writable<StatHistoryData[]>([]);
export const riskHistory = writable<StatHistoryData[]>([]);
export const numIPsHistory = writable<StatHistoryData[]>([]);
export const ipValueHistory = writable<StatHistoryData[]>([]);

/**
 * Current Time Store
 */
export const currentTime = writable<string>(new Date().toISOString());

/**
 * Constants for Stat Calculations
 */
const ipValueFactor = 1000;
const riskCostFactor = 50;
const opinionFactor = 0.1;
const riskIncreaseFactor = 0.5;
const ipValueGrowthFactor = 500;

/**
 * Initialize Stats History
 */
export function initializeStatsHistory(initialTime: string) {
    const initialMoney = get(money);
    const initialOpinion = get(opinion);
    const initialRisk = get(risk);
    const initialNumIPs = get(numIPs);
    const initialIPValue = get(ipValue);

    moneyHistory.update(history => [...history, { time: initialTime, value: initialMoney }]);
    opinionHistory.update(history => [...history, { time: initialTime, value: initialOpinion }]);
    riskHistory.update(history => [...history, { time: initialTime, value: initialRisk }]);
    numIPsHistory.update(history => [...history, { time: initialTime, value: initialNumIPs }]);
    ipValueHistory.update(history => [...history, { time: initialTime, value: initialIPValue }]);
}

/**
 * Update Stats Based on Card Decision
 */
export function updateStats(cardEffects: CardEffects) {
    // Increment accepted cards
    acceptedCards.update(count => count + 1);

    // Get and update current time
    let newTime: string;
    currentTime.update(time => {
        const date = new Date(time);
        date.setDate(date.getDate() + 7);
        newTime = date.toISOString();
        return newTime;
    });

    const {
        moneyChangeFromCard,
        opinionChangeFromCard,
        riskChangeFromCard,
        numIPsFromCard,
        ipValueChangeFromCard
    } = cardEffects;

    // Update Money
    money.update(currentMoney => {
        const revenueFromIPs = get(numIPs) * ipValueFactor;
        const penaltyFromRisk = get(risk) * riskCostFactor;
        const newMoney = currentMoney + revenueFromIPs - penaltyFromRisk + moneyChangeFromCard;
        return newMoney;
    });

    // Update Public Opinion
    opinion.update(currentOpinion => {
        const currentRisk = get(risk);
        const opinionImprovement = opinionFactor * (10 - currentRisk);
        let newOpinion = currentOpinion + opinionImprovement + opinionChangeFromCard;
        newOpinion = Math.min(Math.max(newOpinion, 0), 10); // Clamp between 0 and 10
        return newOpinion;
    });

    // Update Environmental Risk
    risk.update(currentRisk => {
        const currentOpinion = get(opinion);
        const riskIncrease = riskIncreaseFactor * (10 - currentOpinion);
        let newRisk = currentRisk + riskIncrease + riskChangeFromCard;
        newRisk = Math.min(Math.max(newRisk, 0), 100); // Clamp between 0% and 100%
        return newRisk;
    });

    // Update Number of IPs
    numIPs.update(currentNumIPs => currentNumIPs + numIPsFromCard);

    // Update Value of IPs
    ipValue.update(currentIPValue => {
        const growthFromIPs = get(numIPs) * ipValueGrowthFactor;
        const newIPValue = currentIPValue + growthFromIPs + ipValueChangeFromCard;
        return newIPValue;
    });

    // Log Updated Stats to History
    const updatedMoney = get(money);
    const updatedOpinion = get(opinion);
    const updatedRisk = get(risk);
    const updatedNumIPs = get(numIPs);
    const updatedIPValue = get(ipValue);

    moneyHistory.update(history => [...history, { time: newTime, value: updatedMoney }]);
    opinionHistory.update(history => [...history, { time: newTime, value: updatedOpinion }]);
    riskHistory.update(history => [...history, { time: newTime, value: updatedRisk }]);
    numIPsHistory.update(history => [...history, { time: newTime, value: updatedNumIPs }]);
    ipValueHistory.update(history => [...history, { time: newTime, value: updatedIPValue }]);
}

