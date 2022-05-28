<script>
  import { onMount, tick } from "svelte";
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";

  import { backendUri } from "./lib/store";

  onMount(async () => {
    const config = await fetch("config/config.json").then(async (res) =>
      res.json()
    );

    backendUri.set(config.backendUri);

    await tick();
  });
</script>

<Router {routes} />
