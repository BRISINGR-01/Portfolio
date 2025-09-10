<script>
  import { CopyButton } from "svelte-ux";
</script>

<div
  style="padding: 1em; display: flex; justify-content: center; align-items: center; flex-direction: column"
>
  <p class="text-xl">Set up machine commands</p>
  <div
    style="display: flex; justify-content: center; align-items: center; gap: 1em"
  >
    <p>min</p>
    <CopyButton
      value="curl https://raw.githubusercontent.com/BRISINGR-01/dotfiles/main/setUp.sh | bash -s -- min"
    />
  </div>
  <div
    style="display: flex; justify-content: center; align-items: center; gap: 1em"
  >
    <p>full</p>
    <CopyButton
      value="curl https://raw.githubusercontent.com/BRISINGR-01/dotfiles/main/setUp.sh | bash"
    />
  </div>
</div>
