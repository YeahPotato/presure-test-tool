# Presure Test Tool
![node-version](https://img.shields.io/badge/Node-14.4.0-brightgreen)

## Config
`Http Address`:设置压测的目标地址

`Request Number`:设置压测量级

`Duration`:发送所有请求的时间，default:1

## Start
`node presure-rest.js`

### Result

```
----------Pressure Test Tool v0.0.1----------
--Config
Http Address: https://www.baidu.com/
Request Numbers: 20
Duration: 1

--Progress
Requesting: 100.00% ██████████████████████████████ 20/20

--Result
Total: 20, Success: 20, Error: 0
Throughput: 4.55/Sec
┌─────────┬───────┬────────┬─────────┬──────┐
│ (index) │ error │ status │ message │ time │
├─────────┼───────┼────────┼─────────┼──────┤
│    0    │ false │  200   │  'OK'   │ 3633 │
│    1    │ false │  200   │  'OK'   │ 3640 │
│    2    │ false │  200   │  'OK'   │ 3642 │
│    3    │ false │  200   │  'OK'   │ 3645 │
│    4    │ false │  200   │  'OK'   │ 3650 │
│    5    │ false │  200   │  'OK'   │ 3688 │
│    6    │ false │  200   │  'OK'   │ 3690 │
│    7    │ false │  200   │  'OK'   │ 3729 │
│    8    │ false │  200   │  'OK'   │ 3727 │
│    9    │ false │  200   │  'OK'   │ 3827 │
│   10    │ false │  200   │  'OK'   │ 3839 │
│   11    │ false │  200   │  'OK'   │ 3844 │
│   12    │ false │  200   │  'OK'   │ 3836 │
│   13    │ false │  200   │  'OK'   │ 3847 │
│   14    │ false │  200   │  'OK'   │ 3895 │
│   15    │ false │  200   │  'OK'   │ 3931 │
│   16    │ false │  200   │  'OK'   │ 3934 │
│   17    │ false │  200   │  'OK'   │ 3939 │
│   18    │ false │  200   │  'OK'   │ 3976 │
│   19    │ false │  200   │  'OK'   │ 4394 │
└─────────┴───────┴────────┴─────────┴──────┘
```