<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";

    import { getRoundName } from "$lib/utils";

    import puzzles from "$lib/data/puzzles";
    import Card from "$lib/components/global/card/Card.svelte";

    import TabBar from "$lib/components/global/TabBar.svelte";

    import type { PageData } from "./$types";
    export let data: PageData;

    let locations = ["info", "competitors", "schedule"];
    let tabIndex = 2;

    $: {
        if (browser) {
            goto(`/meetups/${data.slug}/` + locations[tabIndex], {
                replaceState: true,
            });
        }
    }
</script>

<TabBar
    labels={["Info", "Competitors", "Schedule & Results"]}
    bind:selectedIndex={tabIndex}
/>

<!-- TODO: future todo, show by event? -->
{#if data.meetup.rounds && data.meetup.rounds.length > 0}
    <div class="schedule-grid">
        {#each data.meetup.rounds as round}
            {@const puzzle = puzzles[round.puzzle]}
            <a href="/meetups/{data.slug}/results/{round.id}">
                <Card height={60}>
                    <div class="schedule-item">
                        <img
                            src={puzzle.icon}
                            alt=""
                            height="36px"
                            style:filter={"invert(30%) sepia(7%) saturate(500%) \
                            hue-rotate(164deg) brightness(94%) contrast(89%)"}
                        />

                        <div class="schedule-item-title">
                            <p
                                style:font-weight="600"
                                style:color="var(--c-dg2)"
                            >
                                {getRoundName(
                                    puzzle.name,
                                    round.round_number,
                                    round.round_maximum
                                )}
                            </p>

                            <p
                                style:font-weight="500"
                                style:color="var(--c-dg1)"
                            >
                                {new Date(round.start_date).toLocaleTimeString(
                                    "en-NZ",
                                    { minute: "2-digit", hour: "2-digit" }
                                )} – {new Date(
                                    round.end_date
                                ).toLocaleTimeString("en-NZ", {
                                    minute: "2-digit",
                                    hour: "2-digit",
                                })}
                            </p>
                        </div>
                    </div>
                </Card>
            </a>
        {/each}
    </div>
{:else}
    <p class="placeholder-text" style:color="var(--c-g)">
        This meetup does not have a schedule yet.
        {#if data.user?.is_club_organiser}
            If you are the organiser for this meetup, create a schedule <a
                class="regular-link"
                href={`/dashboard/meetups/${data.slug}/edit/schedule`}
                >in the edit schedule page.</a
            >
        {/if}
    </p>
{/if}

<style>
    /* INFO: schedule/results tab */
    .schedule-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }

    .schedule-grid,
    .placeholder-text {
        margin-top: 32px;
    }

    @media (max-width: 1040px) {
        .schedule-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 700px) {
        .schedule-grid {
            grid-template-columns: repeat(1, 1fr);
        }
    }

    .schedule-item {
        display: flex;
        align-items: center;
        padding-left: 12px;

        column-gap: 8px;
    }

    .schedule-item-title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .schedule-item-title > p:first-child {
        margin-bottom: -2px;
    }
</style>
