---
author: longlin
pubDatetime: 2025-02-07T22:05:00+08:00
modDatetime: 2025-02-07T22:10:00+08:00
title: HTTP Header 自查表
slug: http-header
featured: true
draft: false
tags:
  - HTTP
  - network
description: 常见 HTTP Header 汇总
---

之前面试的时候被问到，结果有些没答上来，现将常见 Header 汇总在此，方便自查。(大部分内容均来自 MDN 文档)

## 请求标头

### `Referer`

```
Referer: https://www.baidu.com/?tn=15007414_8_dg
```

`Referer` 请求头包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。服务端一般使用 `Referer` 请求头识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等。（即跳转到此页面前点击的链接）

### `Accept`

```
Accept: text/html, text/plain;charset=UTF-8, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8
```

`Accept` 请求 HTTP 标头表示客户端能够理解的内容类型，以 MIME 类型的形式表达。借助内容协商机制, 服务器可以从诸多备选项中选择一项进行应用，并使用 `Content-Type` 响应标头通知客户端它的选择。浏览器会基于请求的上下文来为这个请求标头设置合适的值，比如，获取一个 CSS 层叠样式表时的值与获取图片、视频或脚本文件时的值是不同的。

常见 MIME 类型：

- `application`：不明确属于其他类型之一的任何二进制数据；要么是将以某种方式执行或解释的数据，要么是需要借助某个或某类特定应用程序来使用的二进制数据。（如 PDF、ZIP ）
- `audio`：音频或音乐数据。常见的示例如 `audio/mpeg`。
- `example`：在演示如何使用 MIME 类型的示例中用作占位符的保留类型。这一类型永远不应在示例代码或文档外使用。`example` 也可以作为子类型。例如，在一个处理音频有关的示例中，MIME 类型 `audio/example` 表示该类型是一个占位符，且在实际使用这段代码时，此处应当被替换成适当的类型。
- `font`：字体/字型数据。常见的示例如 `font/woff`、`font/ttf` 和 `font/otf`。
- `image`：图像或图形数据，包括位图和矢量静态图像，以及静态图像格式的动画版本。常见的例子有 `image/jpeg`、`image/png` 和 `image/svg+xml`。
- `text`：纯文本数据，包括任何人类可读内容、源代码或文本数据——如逗号分隔值（comma-separated value，即 CSV）格式的数据。示例包含：`text/plain`、`text/csv` 和 `text/html`。
- `q`：权重系数，范围 `0 =< q <= 1`，`q` 值越大，请求越倾向于获得其“;”之前的类型表示的内容，若没有指定 `q` 值，则默认为 1，若被赋值为 0，则用于提醒服务器哪些是浏览器不接受的内容类型。

### `Accept-Encoding`

```
Accept-Encoding: gzip, deflate, br
```

HTTP 请求头用于告诉服务器客户端支持的内容编码(压缩)方式。它的主要作用是实现 HTTP 压缩,可以减少传输数据的大小,从而提升网页加载速度。

常见的压缩方式:

- `gzip`: 最常用的压缩方式,使用 GNU zip 压缩算法。适用于大多数文本内容(HTML、CSS、JavaScript等),通常可以将文件大小减少到原来的 30%。
- `deflate`: 使用 zlib 结构和 deflate 压缩算法,压缩效果与 gzip 类似。
- `br` (Brotli): 由 Google 开发的压缩算法,针对网络文本内容进行了优化,通常比 gzip 压缩效果更好。
- `identity`: 表示不进行任何编码。

### `Accept-Language`

```
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
```

请求 HTTP 标头表示客户端所偏好的自然语言和区域设置。

### `User-Agent`

```
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0
```

`User-Agent` 请求标头是一个特征字符串，使得服务器和对等网络能够识别发出请求的用户代理的应用程序、操作系统、供应商或版本信息。

- `Mozilla/5.0` 是一个通用标记，表示浏览器与 Mozilla 兼容。出于历史原因，现在每种浏览器几乎都会发送这一标记。
- 下一段字符串（ platform ）描述浏览器运行的原生平台（ Windows、Mac、Linux、Android 等）以及是否运行在手机上。注意，platform 可能包含多个由“;”分隔的标记。
- 基于 Chrome（Chromium 或 Blink 引擎）的浏览器用户代理字符串与 Firefox 相似。为了保持兼容性，它会添加诸如 KHTML, like Gecko 和 Safari 的字符串。
- Edge 浏览器同样基于 Blink 引擎，它添加了 `Edg/<version>`

示例 UA 基于 Edge 浏览器。

### `Sec-CH-UA`

```
Sec-CH-UA: "Not A(Brand";v="8", "Chromium";v="132", "Microsoft Edge";v="132"
```

由于历史原因导致 UA 比较混乱，且存在不少缺点，网络标准商量出了此标头用于替代 UA。（原 UA 出于兼容历史浏览器原因仍然保留）

`Sec-CH-UA` 标头在以逗号分隔的列表中提供与浏览器关联的每个品牌的品牌和重要版本。品牌是用户代理的商业名称，例如：Chromium、Opera、Google Chrome、Microsoft Edge、Firefox 和 Safari。用户代理可能有多个关联的品牌。例如，Opera、Chrome 和 Edge 都基于 Chromium，并将在 `Sec-CH-UA` 标头中提供这两个品牌。

除 `Sec-CH-UA` 外，该系列标头还有更加精确的指定属性（[表格来源](https://simular.co/blog/post/sec-ch-ua-the-useragent-replacement)）：

| 标头                          | 范例值                                   | 说明                                                                             |
| ----------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------- |
| `Sec-CH-UA`                   | "Chromium";v="84","Google Chrome";v="84" | 浏览器品牌清单及其重要版本。                                                     |
| `Sec-CH-UA-Mobile`            | ?1                                       | 布尔值，指出浏览器是否在移动设备上（?1 代表 true）或否（?0 代表 false）。        |
| `Sec-CH-UA-Full-Version`      | "84.0.4143.2"                            | [已淘汰]浏览器的完整版本。                                                       |
| `Sec-CH-UA-Full-Version-List` | "Google Chrome";v="84.0.4143.2"          | 浏览器品牌及其完整版本清单。                                                     |
| `Sec-CH-UA-Platform`          | "Android"                                | 安装的平台，通常是操作系统（OS）。                                               |
| `Sec-CH-UA-Platform-Version`  | "10"                                     | 平台或 OS 的版本。                                                               |
| `Sec-CH-UA-Arch`              | "arm"                                    | 安装的基础架构。仅当这可能与显示网页无关，不过网站会需要提供预设格式的下载项目。 |
| `Sec-CH-UA-Model`             | "Pixel 3"                                | 安装型号。                                                                       |
| `Sec-CH-UA-Bitness`           | "64"                                     | 基础架构的位元程度（即整数或记忆体位址的大小，以位元为单位）                     |

正常来说，由于 `Sec-CH-UA` 涉及用户隐私，需要通过与服务端的 `Accept-CH` 商定同意后发送，不过在 Chrome 89 以后一些与隐私无关的标头会在访问网站后自动发送：

```
Sec-CH-UA: "Chromium";v="93", "Google Chrome";v="93", " Not;A Brand";v="99"
Sec-CH-UA-Mobile: ?0
Sec-CH-UA-Platform: "macOS"
```

### `Connection`

```
Connection: keep-alive
Connection: close
```

`Connection` 通用标头控制网络连接在当前会话完成后是否仍然保持打开状态。如果发送的值是 `keep-alive`，则连接是持久的，不会关闭，允许对同一服务器进行后续请求。

在 HTTP/2 和 HTTP/3 中，禁止使用特定于连接的标头字段，如 `Connection` 和 `Keep-Alive`。

- `Connection: keep-alive` 当一个网页打开完成后，客户端和服务器之间用于传输 HTTP 数据的 TCP 连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接。
- `Connection: close` 代表一个 Request 完成后，客户端和服务器之间用于传输 HTTP 数据的 TCP 连接会关闭， 当客户端再次发送 Request，需要重新建立 TCP 连接。

### `Cookie`

```
Cookie: name=value; name2=value2; name3=value3
```

`Cookie` 是一个 HTTP 请求标头，其中含有先前由服务器通过 `Set-Cookie` 标头投放或通过 JavaScript 的 `Document.cookie` 方法设置，然后存储到客户端的 HTTP cookie 。

### `Host`

```
Host: <host>:<port>
Host: developer.mozilla.org
```

HTTP `Host` 请求标头指定了接收请求的服务器的主机名和端口号。

如果没有包含端口，则默认使用请求服务的端口（例如，HTTPS URL 默认为 443，HTTP URL 默认为 80）。

所有 HTTP/1.1 请求消息中都必须发送一个 `Host` 标头字段。如果 HTTP/1.1 请求消息中缺少标头字段或包含多个 `Host` 标头字段，可能会发送 `400 Bad Request` 状态码。

### `Range`

```
Range: bytes=200-1000, 2000-6576, 19000-
```

`Range` 指定第一个字节的位置和最后一个字节的位置。用于告诉服务器自己想取对象的哪部分。主要用来断点续传。

### `X-Forwarded-For`

```
X-Forwarded-For: client-ip, proxy1-ip, proxy2-ip
```

`X-Forwarded-For (XFF)` 是一个 HTTP 请求头，它的主要作用是追踪客户端请求的源 IP 地址链，在经过代理或负载均衡时特别重要。

工作原理：

1. 当客户端直接访问服务器时，服务器可以直接获取客户端的 IP 地址
2. 但当请求经过代理服务器时，服务器只能看到最后一个代理的 IP 地址
3. `X-Forwarded-For` 会记录请求经过的所有 IP 地址，格式为逗号分隔的列表

### `Priority`

```
Priority: u=3, i=1
```

`Priority` 标头允许客户端向服务器表明请求的相对优先级，帮助服务器优化资源的分配和传输顺序。

优先级值

- u值范围：范围从 0 到 7，0 表示最高优先级，7 表示最低优先级
- i参数：i=1 表示增量（incremental），资源可以逐步处理或显示（如图片、视频）；i=0 表示非增量，资源需要完整接收后才能使用（HTML、CSS、JS 文件）

## 响应标头

### `Access-Control`

该系列标头与 CORS 跨域请求相关。所谓跨域请求，即运行在 `https://domain-a.com` 的 JavaScript 代码使用 XMLHttpRequest 来发起一个到 `https://domain-b.com/data.json` 的请求。

> CORS （Cross-Origin Resource Sharing，跨域资源共享）是一个系统，它由一系列传输的 HTTP 头组成，这些 HTTP 头决定浏览器是否阻止前端 JavaScript 代码获取跨域请求的响应。

#### `Access-Control-Allow-Origin`

```
# 允许所有资源访问
Access-Control-Allow-Origin: *
# 允许指定资源访问
Access-Control-Allow-Origin: https://abc.com
```

#### `Access-Control-Allow-Methods`

```
# 允许通过POST / GET / OPTIONS方法访问
Access-Control-Allow-Methods: POST, GET, OPTIONS
```

#### `Access-Control-Allow-Credentials`

```
Access-Control-Allow-Credentials: true
```

`Access-Control-Allow-Credentials` 是一个重要的 CORS（跨源资源共享）响应头，主要用于控制跨域请求时是否允许发送身份凭证。

凭证信息包括：

- Cookies
- HTTP 认证信息（Authorization 头）
- TLS 客户端证书
- 其他身份验证信息

前端 JavaScript 代码在请求要求包含 `credentials`（`Request.credentials` 的值为 `include`）时，若 `Access-Control-Allow-Credentials` 设为 `true`，即表示服务器明确许可，身份凭证可以包含在请求中，浏览器会将请求响应返回给前端代码（前端 fetch 到相关 Cookie 等信息）。如果服务器不允许浏览器发送 Cookie 等身份凭证，删除该字段即可。如果 `access-control-allow-origin` 为 `*`，当前字段就不能为 `true`。

#### `Access-Control-Allow-Headers`

```
Access-Control-Allow-Headers: Authorization, Content-Type, Accept, Origin, User-Agent, DNT, Cache-Control, X-Mx-ReqToken, X-Data-Type, X-Requested-With, X-Data-Type, X-Auth-Token, token
```

`Access-Control-Allow-Headers` 规定了允许带上的其他 Header 属性。`Access-Control-Allow-Headers` 仅在预检请求（ OPTIONS ）中使用。

CORS 预检请求用于检查服务器是否支持 CORS 协议，并且是否允许使用特定的方法和标头。

它一般是用了以下几个 HTTP 请求标头的 OPTIONS 请求：`Access-Control-Request-Method` 和 `Access-Control-Request-Headers`，以及可选的 `Origin` 标头。

当有必要的时候，浏览器会自动发出预检请求；所以在正常情况下，前端开发者不需要自己去发这样的请求。预检请求会在请求被标记为“需要预检”时进行，而对于简单请求则不会进行。

例如，客户端可能会在实际发送 `GET` 请求之前，先向服务器发起预检请求，用于询问是否可以向服务器发起 `GET` 请求：

```
OPTIONS /resource/foo
Access-Control-Request-Method: GET
Access-Control-Request-Headers: Content-Type, x-requested-with
Origin: https://foo.bar.org
```

如果服务器允许，那么服务器就会响应这个预检请求。并且其响应标头 `Access-Control-Allow-Methods` 会将 `GET` 包含在其中：

```
HTTP/1.1 200 OK
Content-Length: 0
Connection: keep-alive
Access-Control-Allow-Origin: https://foo.bar.org
Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE
Access-Control-Allow-Headers: Content-Type, x-requested-with
Access-Control-Max-Age: 86400
```

### `Cache-Control`

`Cache-Control` 是一个 HTTP 协议中关于缓存的响应头，它由一些能够允许你定义一个响应资源应该何时、如何被缓存以及缓存多长时间的指令组成。当浏览器保存了资源的副本从而达到快速访问的目的的时候也就是 HTTP 发生了缓存。由于浏览器不需要每次都为了接收同一个文件而发起请求，访问这些资源副本就会非常快。

- `Cache-Control:private` 表示响应资源仅仅只能被获取它的浏览器端缓存。它不允许任何中间者（intermediate）缓存响应的资源。
- `Cache-Control:public` 响应资源允许被任何中间者（可能是代理服务器、类似于 cdn 网络）缓存。
- `Cache-Control:must-revalidate` 对于客户机的每次请求，代理服务器必须想服务器验证缓存是否过时。
- `Cache-Control:no-cache` 这个指令表示如果不先检查是否有更新的版本，就不能使用所请求资源的缓存版本。这通常通过 ETag 来实现。当用户返回到带有「no-cache」资源的页面时，客户端必须始终连接到原始服务器，并将缓存资源上的 ETag 与服务器上的 ETag 进行对比。如果两个 ETag 相同，则向用户提供缓存的资源。如果不相同，这说明资源已经更新，客户端需要下载新版本提供给用户。这个过程确保用户始终能获得资源的最新版本，同时又避免了不必要的下载。
- `Cache-Control:no-store` 带有「no-store」指令的响应不能在任何地方进行缓存。这意味着每当用户请求这些数据时，都必须向原始服务器发送请求来获取新的副本。这个指令通常用于包含高度敏感数据（比如银行账户信息）的资源。
- `Cache-Control:max-age=10`  此指令规定了资源的存留时间，换句话说，它指定了在下载资源后可以从缓存中提供该资源的秒数。例如，如果「max-age」设置为1800，这意味着在首次从服务器请求资源后的1,800秒（30分钟）内，后续的请求都将向用户提供该资源的缓存版本。如果用户在30分钟后再次请求该资源，客户端就必须从原始服务器请求新的副本。

### `Vary`

```
Vary: Accept-Encoding, Accept-Language, User-Agent
```

`Vary` 是一个 HTTP 响应标头，用于告诉缓存服务器（比如浏览器缓存、CDN）除了基本的请求 URL 之外，还需要基于哪些 HTTP 标头的值来区分缓存。它解决了"相同 URL 但需要不同响应内容"的场景。

上述例子中表示：告诉缓存服务器针对不同的压缩支持提供不同的缓存版本，基于用户的语言偏好提供不同的内容版本，根据设备类型提供不同的响应：移动设备获取移动版面、桌面设备获取桌面版面。

### `Expires`

```
Expires: Wed, 21 Oct 2015 07:28:00 GMT
```

`Expires` 响应标头包含响应应被视为过期的日期/时间。 如果响应中有指令为 `max-age` 或 `s-maxage` 的 `Cache-Control` 标头，则 `Expires` 标头会被忽略。

### `Last-Modified`

```
Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT
```

`Last-Modified` 是一个响应首部，其中包含源头服务器认定的资源做出修改的日期及时间。它通常被用作一个验证器来判断接收到的或者存储的资源是否彼此一致。由于精确度比 ETag 要低，所以这是一个备用机制。

### `Transfer-Encoding`

```
Transfer-Encoding: chunked
```

这是一个处理消息传输的编码方式，主要关注的是"如何传输数据".

- 作用范围：仅在传输过程中有效，是点对点的概念。数据经过的每个代理服务器都可能会改变这个编码方式。
- 主要目的：优化数据传输，允许数据分块发送（最常用的是 chunked 编码），实现流式传输，无需预先知道内容长度。
- 典型应用场景：使用 chunked 编码进行流式传输，动态生成的内容，大文件传输，实时数据流。

### `Server`

```
Server: Apache/2.4.1 (Unix)
```

`Server` 标头描述了处理请求的源服务器（即生成响应的服务器）所使用的软件。

### `Server-Timing`

```
Server-Timing: name;dur=value;desc="description"
```

`Server-Timing` 是一个 HTTP 响应头，允许服务器向客户端传递性能指标数据。这使得开发者可以监控和分析服务器端各个处理阶段的耗时情况。

- `name`：指标名称（必需）
- `dur`：持续时间，单位为毫秒（可选）
- `desc`：描述信息（可选）

`Server-Timing` 是一个强大的性能分析工具，它让开发者能够更好地了解和优化服务器端的性能表现。通过合理使用这个特性，可以建立更完善的性能监控体系，提供更好的用户体验。

### `Referer-Policy`

```
Referrer-Policy: strict-origin-when-cross-origin
```

`Referer-Policy` 是一个 HTTP 头，用于控制在发送请求时 HTTP `Referer` 头部中包含多少 referrer（来源）信息。它帮助网站控制在用户导航或加载资源时如何传递来源信息。

具体细节可以查看：[浅析 HTTP 请求中的 referrer 和 Referrer-Policy ](https://cloud.tencent.com/developer/article/1925670)

### `Alt-Svc`

```
Alt-Svc: <protocol-id>=<alt-authority>; ma=<max-age>; persist=1
```

`Alt-Svc` 全称为“Alternative-Service”，直译为“备选服务”。该头部列举了当前站点备选的访问方式列表。一般用于在提供“QUIC”等新兴协议支持的同时，实现向下兼容。

- `<protocol-id>` ALPN 协议标识符。例如，h2 代表 HTTP/2，h3-25 代表 HTTP/3 的第 25 个草案。
- `<alt-authority>` 指定备选的权威的用引号包裹的字符串，包含可选的主机覆盖、冒号和必须的端口号。
- `ma=<max-age>` 可选，当前访问方式的有效期，超过该时间后，服务端将不保证该访问方式依旧可用，客户端应当重新获取更新后的 Alt-Svc 列表。单位为秒，默认值为 24 小时（86400)。
- `persist=1` 可选，用于标识当前访问方式在网络环境改变时或者会话间始终保持。

### `Content`

与 `Accept` 相对，`Content` 系列标头是对 `Accept` 系列的回应，一般是从 `Accept` 给出的选择中选出其中之一，作为本次通信所采用的方式方法。

#### `Content-Type`

```
Content-Type: text/html; charset=utf-8
```

`Content-Type` 表示标头用于指示资源的原始媒体类型（在发送时应用任何内容编码之前）。

#### `Content-Encoding`

```
Content-Encoding: gzip
```

`Content-Encoding` 列出了对当前应用资源的任何编码类型，以及编码的顺序。它让接收者知道需要以何种顺序解码数据以获得 `Content-Type` 标头中描述的原始内容格式。内容编码主要用于在不丢失原媒体类型内容的情况下压缩内容。

一般建议服务器应对数据尽可能地进行压缩，并在适当情况下对内容进行编码。对一种压缩过的媒体类型如 `.zip` 或 `.jpeg` 进行额外的压缩并不合适，因为这反而有可能会使内容增大。如果原始媒体以某种方式编码（例如 `.zip` 文件），则该信息不应该被包含在 `Content-Encoding` 标头内。

#### `Content-Language`

```
Content-Language: en-US
```

`Content-Language` 表示标头用来说明访问者希望采用的语言，这样的话用户就可以根据自己偏好的语言来定制不同的内容。

#### `Content-Length`

```
Content-Length: <length>
```

`Content-Length` 标头表示发送给接收方的消息体的大小（以字节为单位）。如此便可以在 HTTP 应用层层面对 TCP 字节流实现分包。

#### `Content-Range`

```
Content-Range: bytes 200-1000/67589
```

`Content-Range` HTTP 响应标头表示部分消息在完整消息中的位置。即对于请求标头中 `Range` 的回应。

#### `Content-Security-Policy`

```
Content-Security-Policy: script-src 'self'; object-src 'none';
style-src cdn.example.org third-party.org; child-src https:
```

CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需提供配置。

CSP 大大增强了网页的安全性。攻击者即使发现了漏洞，也没法注入脚本，除非还控制了一台列入了白名单的可信主机。

具体内容可以参见：[Content Security Policy 入门教程 - 阮一峰](https://www.ruanyifeng.com/blog/2016/09/csp.html)
