<!-- omit in toc -->
# Discord Bot (TypeScript)

Esta é uma base para bots de discord em typescript ou javascript. Ela contém uma api RESTful em fastify que pode servir como a API para integrar uma Dashboard externa ao bot e configurar de forma remota ou como uma API de estatísticas, também possui um setup simples de banco de dados usando Quick.db para salvar dados em formato SQLite de forma facilitada e uma base completa de bot para criar comandos, eventos e componentes sem dificuldades.

<!-- omit in toc -->
## Sumário
- [Instalação](#instalação)
- [Exemplos](#exemplos)
  - [Comandos](#comandos)
  - [Eventos](#eventos)
- [Créditos](#créditos)


## Instalação

Siga estes passos para que você fique pronto para codar usando esta base:
```bash
git clone https://github.com/freitaseric/discord-bot-typescript.git

code discord-bot-typescript/

npm install
```

Após isso você poderá desenvolver seus códigos sem dificuldades.

```bash
# Para testar seu bot use
npm run dev

# Para transpilar o typescript em javascript e conseguir hospedar e rodar com Node.js
npm run build
```

## Exemplos

Nas pastas você encontrará comandos mais complexos, porém aqui vão algumas dicas teóricas

### Comandos
```ts
// src/app/commands/economy/saldo.ts
import { Command } from '@/types/app.d'
import { funcaoExternaDeCriarNovoUsuario } from '@/utils/functions'

export default new Command({
	name: 'saldo',
	description: 'Veja seu saldo',
	run: async ({ interaction }) => {
    if (!database.users.has(interaction.user.id)) {
      funcaoExternaDeCriarNovoUsuario()
    }

    const user = await database.users.get(interaction.user.id)

    if (!user) return await interaction.reply({
      content: "Não foi possível localizar você no banco de dados.",
      ephemeral: true,
    })

		await interaction.reply(`Seu saldo atual é de ${user.balance} coins!`)
	},
})
```

### Eventos
```ts
// src/app/events/economy/chatCoint.ts
import { Event } from '@/types/app.d'
import { funcaoExternaDeCriarNovoUsuario } from '@/utils/functions'

export default new Event({
	name: 'messageCreate',
	run: async message => {
		if (message.author.bot) return

    if (!database.users.has(message.author.id)) {
      funcaoExternaDeCriarNovoUsuario()
    }

    await database.users.add(`${message.author.id}.balance`, 5)
	},
})
```

## Créditos

- [@freitaseric](https://github.com/freitaseric) - criador do handler 