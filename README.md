# AI Workers Frontend

前端项目使用React, TypeScript和Vite构建。

## 环境配置

项目支持不同环境的配置，通过环境变量文件进行管理。

### 环境变量文件

在项目根目录创建以下文件：

1. `.env.dev` - 开发环境配置
```
VITE_API_BASE_URL=http://localhost:7777
```

2. `.env.prod` - 生产环境配置
```
VITE_API_BASE_URL=https://XXXX
```

注意：所有环境变量必须以`VITE_`开头才能在前端代码中访问。

## 可用命令

### 开发环境

- 开发环境启动（连接到开发后端）：
```
npm run dev:dev
```

- 生产环境启动（连接到生产后端）：
```
npm run dev:prod
```

### 构建

- 开发环境构建：
```
npm run build:dev
```

- 生产环境构建：
```
npm run build:prod
```

### 其他命令

- 代码检查：
```
npm run lint
```

- 预览构建结果：
```
npm run preview
```

## API连接

API基础URL必须在环境变量文件中明确设置。如果未设置VITE_API_BASE_URL环境变量，应用将无法启动并显示错误信息。