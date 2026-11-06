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

[![OpenCode reports version 2.2.0]({{ '/assets/lab-01/opencode-version.png' | relative_url }})]({{ '/assets/lab-01/opencode-version.png' | relative_url }}){:target="_blank" rel="noopener"}

Start OpenCode:

```sh
opencode --standalone
```

With `--standalone`, closing OpenCode also stops its background process. It does
not delete your conversations.

[![Fresh OpenCode startup before connecting NVIDIA]({{ '/assets/lab-01/opencode-unconfigured.png' | relative_url }})]({{ '/assets/lab-01/opencode-unconfigured.png' | relative_url }}){:target="_blank" rel="noopener"}

## Connect a Model Provider

NVIDIA offers free model APIs on [NVIDIA Build](https://build.nvidia.com/models).

1. Choose an available model on NVIDIA Build, such as [GLM-5.3-Flash](https://build.nvidia.com/z-ai/glm-5-3-flash). Sign in and select **Generate API Key** under **Build**.

   [![Generate API Key on the NVIDIA Build model page]({{ '/assets/lab-01/nvidia-api-key.png' | relative_url }})]({{ '/assets/lab-01/nvidia-api-key.png' | relative_url }}){:target="_blank" rel="noopener"}

2. In OpenCode, enter `/connect`, select **NVIDIA**, paste your key into the **API key** field, and submit.

   <div class="connection-screens">
     <figure>
       <a target="_blank" rel="noopener" href="{{ '/assets/lab-01/opencode-connect-clean.png' | relative_url }}"><img src="{{ '/assets/lab-01/opencode-connect-clean.png' | relative_url }}" alt="Select NVIDIA in the connection menu"></a>
     </figure>
     <figure>
       <a target="_blank" rel="noopener" href="{{ '/assets/lab-01/opencode-key-clean.png' | relative_url }}"><img src="{{ '/assets/lab-01/opencode-key-clean.png' | relative_url }}" alt="Enter your key in the API key field"></a>
     </figure>
   </div>

3. Enter `/models` and select a model from **NVIDIA**.

   [![The native model picker lists GLM-5.3-Flash from Nvidia separately from OpenCode's free model]({{ '/assets/lab-01/opencode-models-nvidia.png' | relative_url }})]({{ '/assets/lab-01/opencode-models-nvidia.png' | relative_url }}){:target="_blank" rel="noopener"}

You can check the [model configuration guide](https://opencode.ai/v2/docs/models)
if a model is unavailable, or the [provider connection guide](https://opencode.ai/v2/docs/cli/providers)
to connect another service.

*NVIDIA's free API is intended for experimentation. Response times can vary.*

## Try a Hello World Conversation

Send a short greeting to check the connection, for example:

```text
Hello! What can you help me do? Give me three short examples. Do not run tools.
```

OpenCode may reply like this:

[![An earlier first conversation with OpenCode using NVIDIA]({{ '/assets/lab-01/opencode-hello.png' | relative_url }})]({{ '/assets/lab-01/opencode-hello.png' | relative_url }}){:target="_blank" rel="noopener"}

---

[Next: Prepare Your Project with OpenCode]({{ '/lessons/getting-started/explore/' | relative_url }})
