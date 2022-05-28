<script>
  import * as jsondiffpatch from "js";
  import "../html.css";
  import RadioGroup from "./RadioGroup.svelte";

  export let selectedObjectData;

  let diffElement;
  let showAllElements = false;
  let leftSelection = 0;
  let rightSelection = selectedObjectData.length > 1 ? 1 : 0;

  $: base = JSON.parse(selectedObjectData[leftSelection].data);
  $: compare = JSON.parse(selectedObjectData[rightSelection].data);

  $: delta = jsondiffpatch.diff(base, compare);
  $: if (diffElement) {
    jsondiffpatch.formatters.html.showUnchanged(
      showAllElements,
      diffElement,
      0
    );
    if (delta)
      diffElement.innerHTML = jsondiffpatch.formatters.html.format(delta, base);
    if (!delta)
      diffElement.innerHTML =
        "No changes. The base and compare objects are the same";
  }

  const radioData = selectedObjectData.map((s, i) => ({
    value: i,
    label: `${s.changeType.substring(0, 1)} ${s.createdAt} (${s.modifiedBy}`,
  }));
</script>

<diff>
  <diff-selections>
    <compare1 class="compare">
      <RadioGroup
        options={radioData}
        bind:userSelected={leftSelection}
        legend={"Base object"}
      />
    </compare1>
    <compare2 class="compare">
      <RadioGroup
        options={radioData}
        bind:userSelected={rightSelection}
        legend={"Compare object"}
      />
    </compare2>
  </diff-selections>
  <diff-visual>
    <div>Changes</div>
    <!-- <div><input type="checkbox" bind:checked={showAllElements} /></div> -->
    <div bind:this={diffElement} />
  </diff-visual>
</diff>

<style>
  .compare {
    flex: 1;
  }
  diff {
    display: grid;
    grid-template-rows: 1fr 5fr;
    height: 100%;
    gap: 20px;
    height: 100%;
  }

  diff-selections {
    display: flex;
    gap: 10px;
    overflow: auto;
    max-height: 250px;
  }

  diff-visual > div:first-child {
    font-size: 18px;
    font-weight: bold;
  }

  diff-visual > div:nth-child(2) {
    height: 100%;
    overflow: auto;
  }
</style>
