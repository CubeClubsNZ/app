<script lang="ts"> 
    export let title: string, subtitle: string;
    import iconText from "$lib/assets/logo-text-dark.svg";
</script>


<div id="wrapper">
    <a href="/"> 
        <img src={iconText} alt="" height=36/>
    </a>

    <p id="title" class="fsize-title2">{title}</p>
    <p id="subtitle" class="fsize-body">{subtitle}</p>

    <slot></slot>
</div>


<style> 
    #wrapper {
        /* width: min(350px, calc(100% - 40px)); */
        width: 100%;
        height: fit-content;

        display: flex;
        flex-direction: column;

        align-items: flex-start;
    }

    #title {
        font-weight: 500;

        margin-top: 16px;
        margin-bottom: 8px;
    }

    #subtitle {
        color: var(--c-g);

        margin-bottom: 32px;
    }
</style>

