<svelte:head>
  <style>
    .behind {
      margin: 1em;
      box-shadow: 0 0 8px 8px white inset;
      z-index: 1000;
    }
    .behind > img {
      position: relative;
      height: 80vh;
      z-index: 2;
      box-shadow: inset 0px 0px 40px 40px;
    }
    .behind2 {
      margin: 1em;
      height: 78vh;
      position: absolute;
      z-index: 0;
      filter: blur(3px);
      transition: 0.2s;
    }
    .cv {
      height: calc(80vh + 2em);
      position: absolute;
      z-index: 0;
      filter: blur(23px);
    }
    .cv-container {
      position: relative;
      margin: 3em;
    }
    .cv-container:hover > .behind2 {
      filter: blur(40px);
    }
  </style>
</svelte:head>

<a
  style="text-decoration: underline;"
  href="/files/cv.pdf"
  download="Alex Popov - CV.pdf"
>
  <div class="cv-container">
    <img src="/files/CV.png" alt="cv" class="cv" />
    <img src="/files/CV.png" alt="cv" class="behind2" />
    <div class="behind">
      <img src="/files/CV.png" alt="cv" />
    </div>
  </div>
</a>
