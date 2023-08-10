export const DNF = 1e7;

export function clickOutside(node: HTMLElement) {
    function handleClick(event) {
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(
                new CustomEvent('click_outside', node)
            )
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}

export function partition<T>(array: T[], filter: (e: T, idx: number, arr: T[]) => boolean): T[][] {
    const pass: T[] = [], fail: T[] = [];

    array.forEach((e: T, idx: number, arr: T[]) => (filter(e, idx, arr) ? pass : fail).push(e));
    return [pass, fail];
}

export function getRoundName(puzzleName: string, roundNumber: number, maxRound: number) {
    return `${puzzleName} — ${roundNumber == maxRound ? "Final Round" : `Round ${roundNumber}`}`
}


export function formatTime(rawValue: number): string {
    if (rawValue === DNF) {
        return "DNF"
    }

    const minutes = Math.floor(rawValue / 60);
    const seconds = rawValue % 60

    if (minutes === 0) {
        return seconds.toFixed(2)
    } else {
        return `${minutes}:${seconds.toFixed(2).padStart(5, '0')}`
    }
}
