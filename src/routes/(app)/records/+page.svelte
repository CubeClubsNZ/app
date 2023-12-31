<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    import { formatTime } from "$lib/utils";

    import regions, { regionToString } from "$lib/data/regions";
    import puzzles from "$lib/data/puzzles";

    import type { Region } from "@prisma/client";

    import Select from "$lib/components/global/Select.svelte";
    import PageContent from "$lib/components/global/PageContent.svelte";

    import MultiButton, {
        LabelType,
    } from "$lib/components/global/MultiButton.svelte";

    import type { PageData } from "./$types";
    import Table, { DisplayType, MixDisplayMethod } from "$lib/components/global/Table.svelte";

    let regionSelected: string, displayType: number;

    $: updateQuery(regionSelected, displayType);

    function updateQuery(selectedRegion: string, displayType: number) {
        if (!browser) {
            return;
        }

        let query = new URLSearchParams($page.url.searchParams.toString());

        if (selectedRegion == "") {
            query.delete("region");
        } else {
            query.set("region", selectedRegion);
        }

        query.set("displayType", displayType ? "history" : "current");

        goto(`?${query.toString()}`);
    }

    interface Result {
        name: string;
        result: number;
        region: Region;
        meetupName: string;
        data: any;
    }

    export let data: PageData;
    let resolvedHistorical = false;

    data.streamed.historicalRecords?.then(() => {resolvedHistorical = true})

    // TODO: if this page is slow, current/history can be goto() instead.
</script>

<svelte:head>
    <title>Records</title>
</svelte:head>

<PageContent
    heading="Records"
    subheading="Records shown are for all records broken at meetups and are not grouped by age or gender."
>
    <div class="filter-bar">
        <div class="label-group">
            <p class="label">Region</p>

            <Select name="region" bind:value={regionSelected}>
                <option selected value>All Regions</option>
                {#each Object.keys(regions) as value}
                    <option {value}>{regionToString(value)}</option>
                {/each}
            </Select>
        </div>

        <div class="label-group">
            <p class="label">Show</p>

            <MultiButton
                bind:selectedIndex={displayType}
                labels={[
                    { type: LabelType.Text, data: "Current" },
                    { type: LabelType.Text, data: "History" },
                ]}
            />
        </div>
    </div>

    {#if data.streamed.records}
        <!-- current -->
        {#each Object.entries(puzzles) as [puzzle, { name, icon }], i}
            {@const ismbld = puzzle == "MULTIBLD"}
            {@const isfmc = puzzle == "FMC"}

            {@const subpromise = (async() => {
                const records = await data.streamed.records
                return ismbld ? [records[puzzle]?.single] : [records[puzzle]?.single, records[puzzle]?.average]
            })() }
            <div class={"group-label group-label-" + i}>
                <img src={icon} alt="" />

                <h3 class="fsize-title2">{name}</h3>
            </div>

            <Table
                list={subpromise}
                displayType={ismbld ? DisplayType.SINGLE : DisplayType.MIX}
                hasMeetup={true}
                hasSolves={!ismbld}
                loadingPlaceholderCount={ismbld ? 1 : 2}
                widths={ ismbld ? ["210px", "80px", "160px", "auto"] : ["50px", "160px", "80px", "160px", "270px", "auto"]}
                displayRank={false}
                {ismbld}
                {isfmc}
            />
        {/each}
    {:else if data.streamed.historicalRecords}
        {#each Object.entries(puzzles) as [puzzle, { name, icon }], i}
            {@const ismbld = puzzle == "MULTIBLD"}
            {@const isfmc = puzzle == "FMC"}

            <div class={"group-label group-label-" + i}>
                <img src={icon} alt="" />

                <h3 class="fsize-title2">{name} History</h3>
            </div>

            {#if resolvedHistorical && ismbld}
            <Table
                list={data.streamed.historicalRecords}
                k={puzzle}
                displayType={DisplayType.SINGLE}
                hasMeetup={true}
                displayRank={false}
                showDate={true}
                ismbld={true}
            />
            {:else}
            <Table
                list={data.streamed.historicalRecords}
                k={puzzle}
                displayType={DisplayType.MIX}
                hasMeetup={true}
                displayRank={false}
                showDate={true}
                mixDisplayMethod={MixDisplayMethod.SeparateAverageAndSingle}
                {isfmc}
            />
            {/if}
        {/each}
    {/if}
</PageContent>

<style>
    .group-label {
        height: 28px;
        display: flex;
        flex-direction: row;
        column-gap: 8px;

        margin-bottom: 4px;
        margin-top: 48px;
    }

    .group-label-0 {
        margin-top: 0;
    }

    .group-label h3 {
        font-weight: 500;
    }

    .tc-name,
    .tc-region,
    .tc-meetup,
    .tc-solves,
    .tc-type {
        text-align: left;
    }

    .tc-result,
    .tc-name {
        font-weight: 500;
    }

    .tc-result {
        text-align: right;
    }

    .tc-type {
        color: var(--c-dg1);
    }

    .filter-bar {
        padding-bottom: 32px;
    }
</style>
