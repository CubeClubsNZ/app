<script lang="ts"> 
    import { enhance } from "$app/forms";

    export let name: string;
    export let fillWidth = true;

    import Button, { ButtonType, ButtonSize } from "$lib/components/global/Button.svelte";

    export let run;
</script>

<form method="POST" use:enhance={run ?? (() => {})}> 
    <slot/>

    <button style:margin-top=16px>
        <Button type={ButtonType.Coloured} size={ButtonSize.Regular} {fillWidth}>
            <p style:font-weight=500>{name}</p>
        </Button>
    </button>
</form>


<style> 
    form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
    }
</style>
