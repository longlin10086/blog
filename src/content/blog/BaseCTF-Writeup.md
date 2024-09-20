---
author: longlin
pubDatetime: 2024-08-17T15:22:00Z
modDatetime: 2024-08-17T09:12:47.400Z
title: BaseCTF Writeup
slug: basectf
featured: true
draft: false
tags:
  - ctf
description: BaseCTF 新生赛题解
---

前面两周没怎么做题，就不写 writeup 了。

## Misc

### 纯鹿人

打开后发现是一个 docx 文件。移开图片后发现有隐藏文字，更改颜色后发现用 Base64 编码。

![](@assets/images/BaseCTF/lu1.png)

解密后得到：`password：ikunikun`

很明显提示有隐藏压缩包，由于 docx 本身可以当作 zip，将后缀直接改为 zip 后解压，得到：

```bash
.
├── [Content_Types].xml
├── _rels
├── docProps
│   ├── app.xml
│   └── core.xml
└── word
    ├── _rels
    │   └── document.xml.rels
    ├── document.xml
    ├── endnotes.xml
    ├── fontTable.xml
    ├── footnotes.xml
    ├── media
    │   └── image1.jpeg
    ├── settings.xml
    ├── styles.xml
    ├── theme
    │   └── theme1.xml
    └── webSettings.xml
```

`binwalk image1.jpeg` 发现有隐藏 zip，用 `foremost` 提取得到加密压缩包。用之前得到的密码解密提取出 `flag.txt` 即可。

`BaseCTF{d176adc7-5919-4a0c-9556-0301fc4d9c35}`
