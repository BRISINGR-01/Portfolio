<svelte:head>
  <title>Alex Popov- Portfolio</title>
  <meta name="description" content="Three.js portfolio built with Svelte" />
  <script
    src="https://platform.linkedin.com/badges/js/profile.js"
    async
    defer
    type="text/javascript"
  ></script>
</svelte:head>
<div
  style="height: 100vh; width: 100vw; display: flex; justify-content: center; align-items: center; background-color: black; flex-direction: row; flex-wrap: wrap;"
>
  <div style="width: 20%; color: white; margin-right: 7em; text-align: r;">
    <span style="font-size: 2.5em;">Hi I'm Alex 👋,</span>
    <br />
    <span style="font-size: 1.3em;">
      I'm a versatile web developer with a knack for crafting websites,
      extensions, cross-platform apps, scripts, and even 3D experiences! Whether
      it's coding sleek interfaces or diving into the world of automation, I
      thrive on turning ideas into digital reality. I enjoy exploring the
      endless possibilities of code and bringing innovative ideas to life.
    </span>
    <br />
    <br />
    <h4>
      This semester I am building my <a
        href="/preview"
        style="text-decoration: underline;">portfolio</a
      >, but until then you can take a look at my
      <a
        style="text-decoration: underline;"
        href="/files/cv.pdf"
        download="Alex Popov - CV.pdf">CV</a
      >
      ⇒
    </h4>
    <br />
    <div
      class="badge-base LI-profile-badge"
      data-locale="en_US"
      data-size="large"
      data-theme="light"
      data-type="HORIZONTAL"
      data-vanity="alexander-popov-61126825a"
      data-version="v1"
    >
      <a
        class="badge-base__link LI-simple-link"
        href="https://nl.linkedin.com/in/alexander-popov-61126825a?trk=profile-badge"
      >
      </a>
    </div>
  </div>

  <!-- CV -->
  <div style="position: relative;">
    <img
      src="/files/CV.png"
      alt="cv"
      style="height: calc(80vh + 2em); position: absolute;z-index: 0; filter: blur(23px)"
    />
    <img
      src="/files/CV.png"
      alt="cv"
      style="margin: 1em;height: calc(80vh); position: absolute;z-index: 0; filter: blur(3px)"
    />
    <div style="margin: 1em;box-shadow: 0 0 8px 8px white inset;z-index: 1000;">
      <img
        src="/files/CV.png"
        alt="cv"
        style="position: relative;height: 80vh;z-index: 2; box-shadow: inset 0px 0px 40px 40px;"
      />
    </div>
  </div>
</div>
