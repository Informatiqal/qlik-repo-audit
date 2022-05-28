<!-- routify:options preload="proximity" -->
<script>
  import { backendUri } from "../lib/store";
  import Spinner from "../components/Spinner.svelte";
  import Header from "../components/Header.svelte";

  async function loadData() {
    return await fetch(`${$backendUri}/objectNames/all`).then((res) =>
      res.json()
    );
  }

  async function timeout() {
    return new Promise((resolve) => setTimeout(resolve, 500));
  }

  async function init() {
    return await Promise.all([timeout(), loadData()]).then((a) => a[1]);
  }
</script>

<layout>
  {#await init()}
    <spinner>
      <Spinner />
    </spinner>
  {:then selectData}
    <main>
      <Header />
      <slot scoped={{ selectData }} />
    </main>
  {/await}
</layout>

<style>
  spinner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  layout {
    height: 100%;
    overflow: hidden;
  }
</style>
