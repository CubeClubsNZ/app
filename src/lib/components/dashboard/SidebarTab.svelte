<script lang="ts">
    import type { IconEvents, IconProps } from "lucide-svelte";
    import type { ComponentType, SvelteComponent } from "svelte";

    export let isActive = false;

    export let iconCompontent: ComponentType<SvelteComponent<IconProps, IconEvents, {}>>, label: string;

    export let perform: () => void = () => {};
</script>


<button on:click={perform}>
    <div class="container" data-active={isActive}>
        <svelte:component this={iconCompontent} size="20px" />

        <p class="fsize-body"> {label} </p>
    </div>
</button>


<style>
    .container {
        height: 34px;
        border-radius: 6px;

        background-color: white;
        color: var(--c-g);

        display: flex;
        align-items: center;

        column-gap: 12px;

        padding-left: 6px;
        padding-right: 6px;

        cursor: pointer;


        transition: background-color var(--v-animation-delay) ease-in-out,
                    color var(--v-animation-delay) ease-in-out;
    }

    .container[data-active=true] {
        background-color: var(--c-la1);
        color: var(--c-a);
    }

    .container[data-active=true] * {
        font-weight: 500;
    }

    .container[data-active=false]:hover {
        background-color: var(--c-lgh);
        color: var(--c-dg1);
    }

    button {
        width: 100%;
    }
</style>
