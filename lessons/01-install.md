---
layout: default
title: "1. Set Up OpenCode"
parent: "Lab 1: Getting Started with OpenCode"
nav_order: 1
permalink: /lessons/getting-started/install/
---

# 1. Set Up OpenCode

## Install OpenCode

This lab uses **OpenCode CLI 2.2.0**. Follow the
[official installation guide](https://opencode.ai/v2/docs/#cli) for your operating system.

For example, on macOS:

```sh
curl -fsSL https://opencode.ai/v2/install | bash -s -- --version 2.2.0
```

You can check the installed version in a new terminal:

```sh
opencode --version
```

[![OpenCode reports version 2.2.0]({{ '/assets/lab-01/opencode-version.png' | relative_url }})]({{ '/assets/lab-01/opencode-version.png' | relative_url }})

Start OpenCode:

```sh
opencode --standalone
```

With `--standalone`, closing OpenCode also stops its background process. It does
not delete your conversations.

[![Fresh OpenCode startup before connecting NVIDIA]({{ '/assets/lab-01/opencode-unconfigured.png' | relative_url }})]({{ '/assets/lab-01/opencode-unconfigured.png' | relative_url }})

*OpenCode before connecting NVIDIA. A default model name may already appear.*

## Connect a Model Provider

NVIDIA offers free model APIs on [NVIDIA Build](https://build.nvidia.com/models).
Connect your account, then choose a model:

1. Choose an available model on NVIDIA Build, for example [GLM-5.3-Flash](https://build.nvidia.com/z-ai/glm-5-3-flash). Sign in and select **Generate API Key** under **Build**.

   [![Generate API Key on the NVIDIA Build model page]({{ '/assets/lab-01/nvidia-api-key.png' | relative_url }})]({{ '/assets/lab-01/nvidia-api-key.png' | relative_url }})

2. In OpenCode, enter `/connect`, select **NVIDIA**, paste your key into the **API key** field, and submit.

   <div class="connection-screens">
     <figure>
       <a href="{{ '/assets/lab-01/opencode-connect-clean.png' | relative_url }}"><img src="{{ '/assets/lab-01/opencode-connect-clean.png' | relative_url }}" alt="Select NVIDIA in the connection menu"></a>
       <figcaption>Select NVIDIA.</figcaption>
     </figure>
     <figure>
       <a href="{{ '/assets/lab-01/opencode-key-clean.png' | relative_url }}"><img src="{{ '/assets/lab-01/opencode-key-clean.png' | relative_url }}" alt="Enter your key in the API key field"></a>
       <figcaption>Enter your API key.</figcaption>
     </figure>
   </div>

3. Enter `/models` and select the NVIDIA model you want to use, such as **GLM-5.3-Flash**.

- To try another available NVIDIA model, select it with `/models`. If it is missing from the list, see the [model configuration guide](https://opencode.ai/v2/docs/models).
- To connect another service, such as DeepSeek, see the [provider connection guide](https://opencode.ai/v2/docs/cli/providers).

## Try a First Conversation

Send a first message:

```text
Hello, OpenCode!
```

[![An earlier first conversation with OpenCode using NVIDIA]({{ '/assets/lab-01/opencode-hello.png' | relative_url }})]({{ '/assets/lab-01/opencode-hello.png' | relative_url }})

*Example from an earlier run: asking OpenCode what it can help with.*

---

[Next: Explore the Website]({{ '/lessons/getting-started/explore/' | relative_url }})
