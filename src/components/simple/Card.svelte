<script lang="ts">
  export let title: String;
  // export let body: ;
</script>

<svelte:head>
  <style>
    :root {
      --color: rgba(102, 51, 102, 0.902);
      --icon-size: 2.4em;
    }
    html,
    body {
      overflow: auto;
    }
    .container {
      display: flex;
      font:
        1rem "Lato Extended",
        "Lato",
        "Helvetica Neue",
        Helvetica,
        Arial,
        sans-serif;
      width: min-content;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    #profilePic {
      border-radius: 5px;
      margin-bottom: 0.75em;
      border: 2px solid black;
    }
    .card {
      position: relative;
      display: flex;
      align-items: center;
      width: fit-content;
      height: fit-content;
      flex-direction: column;
      border: 2px solid black;
      border-radius: 5px;
      box-shadow: 5px 5px 16px 0px #663366e6;
      padding: 1em;
      margin: 1em;
      font-size: 1.2em;
    }
    .card:hover {
      transition: ease-in;
      box-shadow: 5px 5px 16px 0px #0d93d5e6;
    }
    .card:hover > .line {
      background-color: #0d93d5e6;
    }
    .card:hover > div > div > div > .line-vertical {
      background-color: #0d93d5e6;
    }
    .card > .title {
      width: 100%;
      position: relative;
      margin-left: 0.25em;
      margin-right: 0.25em;
      font-size: 2em;
      color: "white";
    }
    .icons-container {
      display: flex;
      gap: 0.3em;
      justify-content: center;
      flex-wrap: wrap;
    }
    .icons-container > a {
      all: unset;
      cursor: pointer;
    }
    .icons-container > a > img,
    .icons-container > a > svg,
    .icons-container > a,
    .icons-container > img,
    .icons-container > svg {
      border: none;
      width: var(--icon-size);
      height: var(--icon-size);
    }
    .table {
      display: flex;
      gap: 1em;
      flex-direction: row;
    }
    .table > div {
      display: flex;
      flex-direction: column;
    }
    .line {
      background-color: #663366e6;
      border-radius: 100%;
      width: calc(100%);
      margin-bottom: 0.5em;
      height: 3px;
    }
    .line-vertical {
      border-radius: 25%;
      margin: 0 0.5em;
      width: 3px;
      height: 100%;
      background-color: #663366e6;
    }
    .full-w {
      width: calc(100% - 4em);
    }
    #tooltip {
      display: none;
      position: absolute;
      background-color: rgb(250 250 250);
      border: 2px solid #0d93d5e6;
      border-radius: 5px;
      gap: 0.5em;
      align-items: center;
      padding: 5px;
      margin: 5px;
      box-shadow: 3px 2px 7px 0px #0d93d5e6;
      transition: all 0.2s;
      opacity: 0;
    }
    #tooltip-button {
      cursor: pointer;
    }
  </style>
</svelte:head>

<div class="card">
  <span class="title">{title}</span>
  <div class="line"></div>

  <slot></slot>
</div>
