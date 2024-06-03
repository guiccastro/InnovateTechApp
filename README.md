# InnovateTech APP

Aplicativo para a visualização de informações de alunos feito com React Native e TypeScript.

O projeto foi criado usando:
- [Expo](https://expo.dev/): Criação e gerenciamento do projeto.
- [NativeBase](https://nativebase.io/): Componentes para React Native.
- Axios: Comunicação com API.
- Expo SQLite: Acesso ao Banco de Dados.

# Como rodar o aplicativo

Existem duas maneiras de rodar o aplicativo InnovateTechApp, através de um .apk ou de um servidor do Expo. 


## Baixando o .apk
A maneira *"fácil"* é baixando o **.apk** do projeto através deste [link](https://expo.dev/accounts/guiccastro/projects/InnovateTechApp/builds/fae258cb-c043-4c24-a087-be72cde969e3) e instalar ele onde você quiser, podendo ser em um emulador ou em um dispositivo físico.

## Servidor Expo

A maneira *"difícil"* envolve rodar um servidor do Expo localmente, para que juntamente do aplicativo do Expo, você consiga rodar o InnovateTechApp no seu dispositivo. Abaixo segue as instruções caso queira seguir por este caminho:

### 1. Clonar ou baixar o repositório
Primeiramente, será necessário ter o projeto no seu computador. Você pode clonar ele através do GitHub, ou apenas baixá-lo manualmente.

### 2. Baixar o Node.js
Para poder baixar as dependências do projeto e rodar o servidor Expo, será necessário ter o Node.js instalado no seu computador. Caso não tenha, ele pode ser baixado [aqui](https://nodejs.org/en). 

**IMPORTANTE:** Durante a instalação do Node.js, exite um checkbox perguntande se você quer instalar outros pacotes do Node.js, **marque esta opção**. E no final da instalação, **reinicie o seu computador**, caso contrário, o terminal não irá reconhecer alguns comandos que iremos usar.

### 3. Executar servidor Expo
Com o projeto já no seu computador, você precisar abrir um terminal dentro da pasta do projeto. Você pode clicar com o botão direito na paste e selecionar a opção `Abrir no terminal`, ou navegar através do terminal até a pasta do projeot:

```bash
cd pasta_do_projeto
```

Em seguida execute o comando `npm install`. Ele irá instalar todas as dependências do projeto:

```bash
npm install
```

Após as intalações das depenências estiverem completas, é só executar o comando `npx expo start` para iniciar o servidor do Expo:

```bash
npx expo start
```

Você verá que um QRCode será gerado. Para poder ler o QRCode, baixa o aplicativo do [Expo na PlayStore](https://play.google.com/store/apps/details?id=host.exp.exponent&pcampaignid=web_share). Ao abrir o aplicativo do Expo, selecione a opção `Scan QR code` e escaneie o QRCode que foi gerado no seu terminal. 

Pronto! O aplicativo do InnovateTechApp estará rodando normalmente.

# Observações

O aplicativo foi testado apenas na plataforma Android, portanto, recomendo testá-lo em um Android também.