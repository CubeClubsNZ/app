<script lang="ts">
    import { dev } from "$app/environment";

    import { goto } from "$app/navigation";

    import "$styles/fonts.css";
    import "$styles/globals.css";
    import "$styles/components.css";


    import logo from "$lib/assets/logo-text-dark.svg";

    import SidebarTab from "$lib/components/dashboard/SidebarTab.svelte";
    import { page } from "$app/stores";
    import { Box, DoorOpen, Users } from "lucide-svelte";


    let currentPage: string;

    /* WARN: IMPORTANT: this is REALLY BAD code but cannot be bothered writing a store
     * the value 19 is based off of "/(admin)/dashboard/"
     * AND WILL BREAK if the route is modified.
     */

    $: currentPage = $page.route.id.slice(19, 20);
</script>

<svelte:head>
    <title>CubeClubs NZ Dashboard</title>
</svelte:head>

<div class="container">
    <div class="sidebar">
        <img src={logo} alt="" style:height=36px style:margin-bottom=48px />

        <SidebarTab iconCompontent={Box} label=Meetups isActive={currentPage === "m"} perform={() => { goto("/dashboard/meetups") }} />
        <SidebarTab iconCompontent={Users} label=Users isActive={currentPage === "u"} perform={() => { goto("/dashboard/users") }} />

        <div class="sidebar-dummy" style:flex-grow=10></div>

        <SidebarTab iconCompontent={DoorOpen} label="Return to CubeClubs" perform={() => { goto("/") }} />
    </div>

    <div class="content" style:position=relative>
        <slot/>
    </div>
</div>


<style>
    .container {
        display: grid;
        grid-template-columns: 300px 1fr;
        height: 100dvh;
        overflow-y: hidden;
    }

    .sidebar {
        grid-column: 1;

        display: flex;
        flex-direction: column;

        row-gap: 16px;

        background-color: white;

        box-shadow: 0px 2px 12px 0px #10151B29; /* cdg3, 16% */


        align-items: flex-start;

        padding-left: 32px;
        padding-right: 32px;
        padding-top: 48px;
        padding-bottom: 48px;

        width: 300px;

    }

    .content {
        grid-column: 2;
        overflow-y: scroll;
    }


    @media(max-width: 1040px) {
        .container {
            grid-template-columns: 0px 1fr;
        }

        .sidebar {
            display: none
        }
    }
</style>
