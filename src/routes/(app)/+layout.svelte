<script lang="ts"> 
    import "../../styles/globals.css";
    import "../../styles/fonts.css";

    import { goto } from "$app/navigation";

    import logo from "$lib/assets/logo-transparent.svg";

    import Button, { ButtonType, ButtonSize } from "$lib/components/Button.svelte";
</script>

<div id="navbar">
    <div id="left"> 
        <a class="image-link" href="/">
            <img src={logo} alt="" height=30>
        </a>

        <a class="regular-link" href="/clubs">Clubs</a>
        <a class="regular-link" href="/contests">Contest</a>
        <a class="regular-link" href="/records">Records</a>
        <a class="regular-link" href="/rankings">Rankings</a>
    </div>

    <div id="right"> 
        <a class="regular-link" href="/login"> Login </a>
        
        <Button type={ButtonType.Regular} size={ButtonSize.Small} href="/signup">
            <div>Sign Up</div>
        </Button>
    </div>
</div>

<div id="main-content"> 
    <slot/>
</div>


<style> 
    .image-link {
        transition: filter 100ms ease-in-out;

        height: 30px;
    }

    .image-link:hover {
        filter: brightness(80%);
    }

    #navbar {
        height: 46px;
        background-color: var(--cdg2);
        border-radius: 12px;
        /* use color-mix when supported/ */
        box-shadow: 0px 4px 16px 0px #292E333D;
        width: fit-content;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 72px;

        font-family: "IBMPlexSans";

        padding: 8px;
        box-sizing: border-box;

        position: fixed;
        top: 16px;
        margin: 0 auto;
        left: 0; right: 0;

    }

    #navbar .regular-link {
        color: var(--cw);
        text-decoration: none;
        font-size: 14px;
        
        transition: color 100ms ease-in-out;
    }

    #navbar .regular-link:hover {
        color: var(--clg1);
    }


    #left, #right {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 24px;
    }

    #main-content {
        padding-top: 12vh;
    }
</style>