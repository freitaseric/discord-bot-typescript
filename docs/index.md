<!-- omit in toc -->
# Discord Bot (Typescript)

Este é um template para a criação de bots do discord usando as linguagens Typescript e Javascript.

<!-- omit in toc -->
## Sumário
- [Recursos](#recursos)
  - [`client` global](#client-global)
  - [`database` global](#database-global)
  - [Manipulador de Comandos](#manipulador-de-comandos)
  - [Manipulador de Eventos](#manipulador-de-eventos)
  - [Manipulador de Botões, Menus de Seleção e Modais](#manipulador-de-botões-menus-de-seleção-e-modais)
  - [API RESTful em Fastify](#api-restful-em-fastify)
  - [Banco de dados](#banco-de-dados)

## Recursos

1. `client` global;
2. `database` global;
3. Manipulador de Comandos;
4. Manipulador de Eventos;
5. Manipulador de Botões, Menus de Seleção e Modais;
6. API RESTful em Fastify;
7. Banco de dados SQLite QuickDB.

### `client` global

A variável global `client` que permite acessar o cliente do discord definida pela função `bootstrapApp` pode ser acessada em qualquer arquivo dentro da pasta `src` sem a necessidade de importá-la de algum lugar.

**Exemplo:**
```typescript
// src/libs/mylib.ts
export function getClientUserName() {
  return client.user?.username // "client" é acessível aqui, mesmo sem importar
}
```

### `database` global

A variável global `database` que permite acessar o banco de dados definida em `src/database/index.ts` pode ser acessada em qualquer arquivo dentro da pasta `src` sem a necessidade de importá-la de algum lugar.

**Exemplo:**
```typescript
// src/server/routes/custom.route.ts
server.get("/database", async (request, response) => {
  response.type("application/json").code(200)
  return database // esse endpoint vai responder com um objeto json contendo os valores do banco.
})
```

### Manipulador de Comandos

Essa base automaticamente carrega todos os comandos criados em `src/app/commands` e qualquer subpasta do mesmo.

Para criar um comando basta exportar como padrão uma instância da classe `Command` que pode ser exportada do módulo `#app`.

**Exemplo de comando mínimo:**
```typescript
import { Command } from '#app'

export default new Command({
  name: 'exemplo',
  description: 'Um comando de exemplo',
  run: async ({ interaction }) => {
    await interaction.reply('Olá mundo!')
  }
})
```

> [!TIP]
> Para mais informações acesse a página de [referência à comandos](./reference/commands.md) na documentação.

### Manipulador de Eventos

Essa base automaticamente carrega todos os eventos criados em `src/app/eventos` e qualquer subpasta do mesmo.

Para criar um evento basta exportar como padrão uma instância da classe `Event` que pode ser exportada do módulo `#app`.

**Exemplo de comando mínimo:**
```typescript
import { Event } from '@/types/app.d'
import { inlineCode } from 'discord.js'

export default new Event({
	name: 'guildMemberAdd',
	run: async member => {
		member.user.send(
			`Boas Vindas ao servidor ${inlineCode(member.displayName)}`,
		)
	},
})

```

> [!TIP]
> Para mais informações acesse a página de [referência à eventos](./reference/events.md) na documentação.

### Manipulador de Botões, Menus de Seleção e Modais

Essa base permite definir e lidar com componentes a partir dos comandos definidos em `src/app/commands` e suas subpastas.

Para criar um componente basta definir a propriedade equivalente ao componente desejado dentro do construtor da classe `Command`.

**Exemplo de comando com botão:**
```typescript
import { Command } from '#app'
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	Collection,
} from 'discord.js'

export default new Command({
	name: 'button',
	description: 'Comando com botão',
	run: async ({ interaction }) => {
		const row = new ActionRowBuilder<ButtonBuilder>({
			components: [
				new ButtonBuilder({
					customId: 'sayHello',
					emoji: '👋',
					label: 'Dizer "Olá"',
					style: ButtonStyle.Premium,
				}),
			],
		})

		await interaction.reply({
			content: 'Clique para dizer "Olá"!',
			components: [row],
		})
	},
	buttons: new Collection([
		[
			'sayHello',
			async interaction => {
				await interaction.reply(`Olá ${interaction.user.displayName}`)
			},
		],
	]),
})


```

> [!TIP]
> Para mais informações acesse a página de [referência à componentes](./reference/components.md) na documentação.

### API RESTful em Fastify

Essa base possui um setup de uma API RESTful simples que pode ser usada para configurar seu bot a partir de uma dashboard externa ou para expor estatísticas.

A raiz do servidor encontra-se em `src/server` e você pode definir suas rodas criando arquivos em  `src/server/routes` e registrando-os em `src/server/routesRegister.ts`.

**Exemplo de rotas simples:**
```typescript
// src/server/routes/custom.routes.ts
import type { FastifyInstance } from 'fastify'

export default async (server: FastifyInstance) => {
	server.get('/', async (_, reply) => {
		reply.type('text/plain').status(200)
		return 'Rota customizada!'
	})
}
```

```typescript
// src/server/routesRegister.ts
import customRoutes from './routes/custom.routes'

...
fastify.register(customRoutes, { prefix: 'custom' })
...
```

> [!TIP]
> Para mais informações acesse a página de [referência ao _web server_](./reference/server.md) na documentação.

### Banco de dados

Essa base contém um setup simples de banco de dados SQLite que salva os dados em formato JSON chamado [Quick.db](https://www.npmjs.com/package/quick.db).

Você pode criar novos _models_ definindo-os em `src/database/models` e por fim adicionando ao objeto principal de banco de dados `src/database/index.ts`.

**Exemplo de _model_:**

```typescript
// src/database/models/guild/Guild.model.ts
import path from 'node:path'
import { QuickDB } from 'quick.db'

export interface IGuild {
  id: string
  embedColor: number | string
}

export default new QuickDB<IGuild>({
	filePath: path.resolve(__dirname, 'guilds.sqlite'),
})
```

> [!TIP]
> Para mais informações acesse a página de [referência ao banco de dados](./reference/database.md) na documentação.