<script>
  import Cv from "../../components/simple/Cv.svelte";
  import Linkdin from "../../components/simple/Linkdin.svelte";
  document.addEventListener("DOMContentLoaded", () => {
    const ageEl = document.getElementById("age");
    if (ageEl) {
      ageEl.innerText = (
        new Date().getFullYear() -
        2003 -
        (new Date().getMonth() < 7 ? 1 : 0)
      ).toString();
    }
  });
</script>

<svelte:head>
  <title>Alex Popov - Portfolio</title>
  <meta name="description" content="Three.js portfolio built with Svelte" />
</svelte:head>
<div
  style="height: 100vh; display: flex; justify-content: center; align-items: center; background-color: black; flex-direction: row; flex-wrap: wrap; overflow: auto;"
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
    <h4 style="color: white;">
      This semester I am building my <a
        href="/preview"
        style="text-decoration: underline; color: #b257b2">portfolio</a
      >, but until then you can take a look at my
      <a
        style="text-decoration: underline; color: #b257b2"
        href="/files/cv.pdf"
        download="Alex Popov - CV.pdf">CV</a
      >
      ⇒
    </h4>
    <br />
    <Linkdin />
  </div>

  <Cv />
</div>

<!-- <div style="background-black">
  <div
    style="display: flex; flex-wrap: wrap; width: min-content; flex-direction: row"
  >
    <Card title="Languages">
      <div class="icons-container">
        <img
          src="/icons/bulgarian.svg"
          alt="bulgarian"
          data-display="bulgarian"
        />
        <img src="/icons/french.svg" alt="french" data-display="french" />
        <img src="/icons/german.svg" alt="german" data-display="german" />
        <img src="/icons/dutch.svg" alt="dutch" data-display="dutch" />
        <img src="/icons/italian.svg" alt="italian" data-display="italian" />
        <img src="/icons/spanish.svg" alt="spanish" data-display="spanish" />
        <img
          src="/icons/portuguese.svg"
          alt="portuguese"
          data-display="portuguese"
        />
        <img src="/icons/english.svg" alt="english" data-display="english" />
      </div>
    </Card>
    <Card title="Interests">
      <div class="table">
        <div class="icons-container">
          <img src="/favicon/favicon-32x32.png" alt="bike" />
          <img src="/icons/languages.svg" alt="languages" />
          <img src="/icons/reading.svg" alt="reading" />
          <img src="/icons/minecraft.svg" alt="minecraft" />
        </div>
        <div style="justify-content: space-around">
          <span>Cycling</span>
          <span>Languages</span>
          <span>Reading</span>
          <span>Minecraft</span>
        </div>
      </div>
    </Card>
    <Card title="Semesters">
      <div class="table" style="gap: 0.5em">
        <div>
          <span>1 ·</span>
          <span>2 ·</span>
          <span>3 ·</span>
        </div>
        <div>
          <span>Software</span>
          <div style="display: flex; height: 100%">
            <div>
              <span>Accelerated Software</span>
              <br />
              <span>OL</span>
            </div>
            <div class="line-vertical"></div>
            <div>
              <span>Academic </span>
              <br />
              <span> Preperation</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
    <Card title="Tech">
      <div class="icons-container">
        <img src="/icons/html.svg" alt="html" data-display="html" />
        <img src="/icons/css.svg" alt="css" data-display="css" />
        <img src="/icons/node.svg" alt="node" data-display="node" />
        <img src="/icons/ts.svg" alt="ts" data-display="ts" />
        <img src="/icons/dart.svg" alt="dart" data-display="dart" />
        <img src="/icons/python.svg" alt="python" data-display="python" />
        <img src="/icons/lua.svg" alt="lua" data-display="lua" />
        <img src="/icons/c-sharp.svg" alt="c-sharp" data-display="c-sharp" />
        <img src="/icons/rust.svg" alt="rust" data-display="rust" />
        <img src="/icons/c.svg" alt="c" data-display="c" />
        <img src="/icons/sql.svg" alt="sql" data-display="sql" />
        <img src="/icons/mantine.svg" alt="mantine" data-display="mantine" />
        <img src="/icons/supabase.svg" alt="supabase" data-display="supabase" />
        <img src="/icons/svelte.svg" alt="svelte" data-display="svelte" />
        <img src="/icons/cypher.svg" alt="cypher" data-display="cypher" />
        <img src="/icons/bash.svg" alt="bash" data-display="bash" />
        <img src="/icons/react.svg" alt="react" data-display="react" />
        <img src="/icons/jest.svg" alt="jest" data-display="jest" />
        <img
          src="/icons/bootstrap.svg"
          alt="bootstrap"
          data-display="bootstrap"
        />
        <img src="/icons/express.svg" alt="express" data-display="express" />
        <img src="/icons/graphQl.svg" alt="graphQl" data-display="graphQl" />
        <img src="/icons/threejs.svg" alt="threejs" data-display="threejs" />
        <img src="/icons/mysql.svg" alt="mysql" data-display="mysql" />
        <img src="/icons/net.svg" alt="net" data-display="net" />
        <img src="/icons/flutter.svg" alt="flutter" data-display="flutter" />
        <img src="/icons/docker.svg" alt="docker" data-display="docker" />
        <img src="/icons/vercel-white.svg" alt="vercel" data-display="vercel" />
        <img src="/icons/svelte.svg" alt="svelte" data-display="svelte" />
        <img src="/icons/net.svg" alt="net" data-display="net" />
        <img src="/icons/nextjs-white.svg" alt="nextjs" data-display="nextjs" />
        <img src="/icons/neo4j-no-text.svg" alt="neo4j" data-display="neo4j" />
        <img src="/icons/smt.svg" alt="smt" data-display="smt" />
        <img
          src="/icons/hackthebox.svg"
          alt="hackthebox"
          data-display="hackthebox"
        />
        <img src="/icons/linux.svg" alt="linux" data-display="linux" />
        <img src="/icons/windows.svg" alt="windows" data-display="windows" />
        <img src="/icons/firebase.svg" alt="firebase" data-display="firebase" />
        <img src="/icons/heroku.svg" alt="heroku" data-display="heroku" />
      </div>
    </Card>
    <Card title="Contacts">
      <div class="icons-container" style="flex-wrap: nowrap">
        <a
          href="mailto:alexander.popov233@gmail.com"
          data-display="alexander.popov233@gmail.com"
        >
          <img src="/icons/gmail.svg" alt="gmail" />
        </a>
        <a href="https://github.com/BRISINGR-01/" data-display="BRISINGR-01">
          <img src="/icons/github.svg" alt="github" />
        </a>
        <a href="https://gitlab.com/BRISINGR-01" data-display="BRISINGR-01">
          <img src="/icons/gitlab.svg" alt="gitlab" />
        </a>
        <a
          href="https://www.linkedin.com/in/alexander-popov-61126825a/"
          data-display="alexander-popov-61126825a"
        >
          <img src="/icons/linkedin.svg" alt="linkedin" />
        </a>
        <a href="https://twitter.com/AlexPopov233" data-display="AlexPopov233">
          <img src="/icons/x.svg" alt="x" />
        </a>
        <a
          href="https://www.instagram.com/alexan6451/"
          data-display="@alexan6451"
        >
          <img src="/icons/instagram.svg" alt="instagram" />
        </a>
      </div>
    </Card>
  </div>
</div> -->
