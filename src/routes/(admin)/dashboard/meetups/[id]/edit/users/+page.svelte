<script lang="ts">
    import { goto, invalidateAll } from '$app/navigation';
    import Breadcrumb from '$lib/components/global/Breadcrumb.svelte';
    import Button from '$lib/components/global/Button.svelte';

    import puzzles from "$lib/data/puzzles";
    import { regionToString } from '$lib/data/regions';
    import { Check, PenIcon, PencilIcon, Plus, Trash2 } from 'lucide-svelte';

    import type { PageData } from './$types';
    export let data: PageData;

    console.log(data.meetup.users)
</script>

<Breadcrumb paths={[
    {name: "Meetups", href: "/dashboard/meetups"},
    {name: data.meetup.name, href: `/dashboard/meetups/${data.meetup.id}/`},
    {name: "Edit Competitors", href: `/dashboard/meetups/${data.meetup.id}/edit/users`}
]} />

<div style:height="16px" />

<a href="/dashboard/meetups/{data.meetup.id}/edit/users/add">
    <Button>
        <div class="button-inner">
            <Plus size="16"/>
            <p> Add Competitor </p>
        </div>
    </Button>
</a>


<h3 class="fsize-title2" style:font-weight=500 style:margin-top=32px style:margin-bottom=16px>Registered Competitors</h3>

{#if data.meetup.users.length > 0}
    <table>
        <colgroup>
            <col span=1 style:width=24px>
            <col span=1 style:width=24px>

            <col span=1 style:width=175px>
            <col span=1 style:width=160px>

                {#each Array(data.meetup.puzzles.length) as _}
                <col span=1 style:width=36px>
                    {/each}

                <col span=1 style:width=auto>
        </colgroup>


        <tbody>
            <tr>
                <th class="tc-delete" />
                <th class="tc-edit" />

                <th class="tc-name">Name</th>
                <th class="tc-region">Region</th>

                {#each data.meetup.puzzles as puzzle}
                    <th class="tc-puzzle">
                        <img src={puzzles[puzzle].icon} alt={puzzles[puzzle].name} style:height=24px>
                    </th>
                {/each}

                <th class="tc-empty" />
            </tr>

            {#each data.meetup.users as { user, registered_events } }
                <tr>
                    <td class="tc-delete">
                        <button style:padding-right="2px" on:click={() => {
                            confirm(`Are you sure you want to delete ${user.name}?`);

                            fetch(`/dashboard/meetups/${data.meetup.id}/edit/users/${user.id}/delete`, {
                                method: "POST"
                            })
                                .then(() => {
                                    invalidateAll()
                                })
                        }}>
                            <Trash2 size="15px" />
                        </button>
                    </td>

                    <td class="tc-edit">
                        <button style:padding-left="2px" style:padding-right="4px" on:click={() => {
                            goto(`/dashboard/meetups/${data.meetup.id}/edit/users/${user.id}`);
                        }}>
                        <PencilIcon
                            size="15px" />
                        </button>
                    </td>

                    <td class="tc-name">
                        <a class="regular-link" style:font-weight=500 href="/user/{user.id}"> {user.name} </a>
                    </td>
                    <td class="tc-region">{regionToString(user.region)}</td>


                    {#each data.meetup.puzzles as puzzle}
                        <td class="tc-puzzle" style:vertical-align="bottom">
                            {#if registered_events.includes(puzzle)}
                                <Check size="18px"/>
                            {/if}
                        </td>
                    {/each}

                    <td class="tc-empty" />
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <p style:color=var(--c-g)>No competitors currently registered for this competition.</p>
{/if}


<style>
    /* INFO: competitors tab */
    .tc-name,
    .tc-region,
    .tc-puzzle {
        text-align: left;
    }

    .tc-edit button, 
    .tc-delete button {
        display: grid;
        align-items: center;
        justify-items: center;
        color: var(--c-g);
        transition: color var(--v-animation-delay) ease-in-out;
        cursor: pointer;
    }

    .tc-delete:hover span {
        color: var(--c-red);
    }

    .tc-edit:hover span {
        color: var(--c-dg1);
    }

    tr:first-child .tc-puzzle {
        vertical-align: top;
    }


    .tc-puzzle {
        width: 24px;
    }

    tr:first-child .tc-puzzle img {
        filter: invert(30%) sepia(7%) saturate(500%) hue-rotate(164deg) brightness(94%) contrast(89%);
        transform: translateY(2px);
    }

    .tc-puzzle img {
        height: 24px;
    }


    .button-inner {
        display: flex;
        align-items: center;
        column-gap: 8px;
    }

    :global(.lucide-check) {
        transform: translateY(calc(30px/2 - 24px/2));
    }

    .button-inner span {
        font-size: 20px;
    }
</style>
