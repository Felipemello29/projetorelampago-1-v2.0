# 🖥️ Live Coding Portfolio V2 - Felipe Mello

Este projeto é uma evolução do portfólio "Terminal", elevando a estética **Retro Sci-Fi** e **Cyberpunk**. A experiência central gira em torno do conceito de "Live Coding", onde o conteúdo é apresentado primeiramente como código sendo digitado em tempo real antes de ser "compilado" na interface visual.

## 🚀 Tecnologias Utilizadas
*   **HTML5**: Estruturação semântica e acessível.
*   **CSS3**:
    *   **Variáveis (:root)**: Gerenciamento de paleta neon (Ciano/Roxo).
    *   **Animações Complexas**: `keyframe` animations para o efeito "Shatter" (quebra de tela), glitches e transições de elementos.
    *   **Efeitos Visuais**: CRT Scanlines, Text Glow, Glassmorphism.
*   **JavaScript (Vanilla)**:
    *   **State Management**: Controle de estados globais (Circuit Overload, Rebooting).
    *   **Canvas API**: Renderização procedural do background "Motherboard" (Placa-mãe) com circuitos interativos.
    *   **Async/Await**: Sincronização da digitação do código com a renderização da UI.

## 🛠️ Funcionalidades e Experiência
*   **Live Coding Reveal**: Ao navegar, uma janela de código se abre e "digita" a estrutura da seção antes dela aparecer na tela.
*   **Interactive Motherboard**: Um background vivo de circuitos que reage aos cliques do usuário (Efeito "Surge").
*   **System Reboot**: Uma funcionalidade de "Hard Reset" que simula um crash do sistema com uma animação dramática de quebra de tela (`page-shatter`) antes de recarregar a página.
*   **Galeria de Projetos**: Cards interativos que levam aos detalhamentos ou demonstrações dos projetos.
*   **Modo "Terminal"**: Estilização visual inspirada em IDEs e terminais antigos.

## 📁 Estrutura de Arquivos
O projeto é contido em uma estrutura simples e limpa:

```
/portfolio-v2
├── index.html           # Estrutura base e Modal de Código
├── style.css            # Estilização Global, Animações e Temas
├── script.js            # Lógica do "Live Coding", Canvas e Navegação
├── avatar.png           # Imagem de perfil
└── README.md            # Documentação
```

## 🎨 Personalização
As cores principais são definidas via CSS Variables no arquivo `style.css`:

```css
:root {
    --bg-color: #050510;        /* Fundo Profundo */
    --accent-color: #00f3ff;    /* Neon Cyan (Principal) */
    --accent-secondary: #bc13fe; /* Neon Purple (Destaque) */
    --code-color: #00f3ff;      /* Cor do texto do terminal */
}
```

## 📧 Contato
*   **LinkedIn**: [Felipe Mello](https://www.linkedin.com/in/felipe-mello-53541421a/)
*   **GitHub**: [@Felipemello29](https://github.com/Felipemello29)
*   **Email**: felipemello29@gmail.com

---
© 2026 // System developed for Alpha EdTech
