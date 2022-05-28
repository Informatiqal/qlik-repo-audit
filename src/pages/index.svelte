<script>
  import { tick } from "svelte";
  import { backendUri } from "../lib/store";

  import Diff from "../components/Diff.svelte";
  export let scoped;

  const servers = Array.from(new Set(scoped.selectData.map((s) => s.server)));
  let types;
  let objects;

  let selected = "-1";
  let selectedType = "-1";
  let selectedObject = "-1";
  let selectedObjectData;

  async function fetchObjData() {
    return fetch(`${$backendUri}/notification/object/${selectedObject}`).then(
      (res) => res.json()
    );
  }

  async function changeObject() {
    if (selectedObject == -1) {
      selectedObjectData = undefined;
      return;
    }

    selectedObjectData = undefined;
    await tick();
    selectedObjectData = await fetchObjData();
  }

  function changeType() {
    if (selectedType == -1) {
      objects = undefined;
      selectedObjectData = undefined;
      return;
    }

    objects = scoped.selectData
      .filter((s) => selected == s.server && selectedType == s.objectType)
      .map((s) => ({
        value: s.objectId,
        description: `${s.objectName} (${s.objectId})`,
      }));

    selectedObject = "-1";
    selectedObjectData = undefined;
  }

  function changeServer() {
    if (selected == "-1") {
      types = undefined;
      objects = undefined;
      selectedObjectData = undefined;
      return;
    }

    types = Array.from(
      new Set(
        scoped.selectData
          .filter((s) => selected == s.server)
          .map((s) => s.objectType)
      )
    );

    objects = undefined;
    selectedType = "-1";
  }
</script>

<content>
  <selections>
    <server-list class="selector">
      <div>Server</div>
      <select bind:value={selected} on:change={() => changeServer()}>
        <option value="-1" selected>Select server</option>
        {#each servers as server}
          <option value={server}>
            {server}
          </option>
        {/each}
      </select>
    </server-list>

    <objectTypes-list class="selector">
      <div>Object Type</div>
      <select
        disabled={types ? false : true}
        bind:value={selectedType}
        on:change={() => changeType()}
      >
        <option value="-1" selected>Select object type</option>

        {#if types}
          {#each types as objType}
            <option value={objType}>
              {objType}
            </option>
          {/each}
        {/if}
      </select>
    </objectTypes-list>

    <objectsList class="selector">
      <div>Object</div>
      <select
        disabled={objects ? false : true}
        bind:value={selectedObject}
        on:change={() => changeObject()}
      >
        {#if objects}
          <option value="-1" selected>Select an {selectedType}</option>
          {#each objects as obj}
            <option value={obj.value}>
              {obj.description}
            </option>
          {/each}
        {:else}
          <option value="-1" selected>Select an object</option>
        {/if}
      </select>
    </objectsList>
  </selections>
  {#if selectedObjectData}
    <Diff {selectedObjectData} />
  {/if}
</content>

<style>
  content {
    display: grid;
    grid-template-rows: auto auto;
    padding: 8px;
    height: 100%;
  }

  selections {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  selections > * {
    flex: 1;
  }

  select {
    width: 100%;
  }
</style>
