"use strict";
class SoundSphereInfo {
    constructor() {
        this.name = "SoundSphere";
        this.change = [
            "1.4.1 -  Aplicação  de alteração visual aos Itens de mixagem de acordo com o descritor semantico. Ajuste do translatte 0.5",
            "1.4.2 - Mudança das cores das amostras e Criação do campo JSONFileStructureVersion.",
            "1.4.3 - Mudanças nas opções de Volume.",
            "1.4.4 - Processar os itens de mixagem ao dar play e download apenas quando tiver alterações.",
            "1.4.4 - O pause agora ativa o Traker.",
            "1.4.4 - Correção  do titulo. ",
            "1.4.5 - Consistência entre cores de  uma versão para outra. ",
            "1.4.5 - Pause não reseta o movimento do painel. ",
            "1.4.6 - Correção do BUG que permitia ativação do Play/Pause quando se tem apenas itens excluidos. ",
            "1.4.6 - Correção do BUG itens excluidos continuavam a serem executados na reprodução. ",
            "1.4.6 - Indicação do operador semântico-timbrístico aplicado no evento usando abreviação tipo aeroporto, posicionamento vertical no início do evento. ",
            "1.4.7 - Correção do BUG que alterava a posição da indicação do descritor de acordo com volume. ",
            "1.4.7 - Mudança visual na indicação do descritor no painel. ",
            "1.4.7 - Implementação da funcionalidade para permitir dar um título a composição. ",
            "1.4.7 - Implementação do log dos itens do painel (histórico) . ",
            "1.4.7 - Mudança da versão de leitura e gravação dos arquivos JSON. ",
            "1.4.8 - Inclusão de informações no leitor JSON. ",
            "1.4.8 - Correção do bug que intens excluidos continuavam a colidir ao alterar itens do painel. ",
            "1.4.8 - Mudança de comportamento relativo a colisões de itens no painel. ",
            "1.4.8 - Tempo máximo redudizo temporariamente para testar mensagens de erro. ",
            "1.4.9 - Correção do BUG que alterava automaticamente filtros do mesmo tipo. ",
            "1.4.9 - Mudança para que todos os Descritores sejam carregados com 40 filtros Peaking com Frequencias diferentes e Q 4.13. ",
            "1.4.10 - Atualização das configurações dos descritores semanticos. ",
            "1.4.11 - Alteração para permtir a definição das cores dos itens a partir da leitura de cores hexadecimais dos nomes dos arquivos. ",
            "1.4.12 -Alteração para exibir mensagem de erro caso código de cor no nome seja inválido e tempo total da composição para 60 minutos. ",
            "1.4.13 - Testes do menu em camadas, vinculacao do gradiente ao valume da amostra do painel e criacao da opcao de cancelar o downlaod. ",
            "1.4.15 - Implementado padrão de cor hsl no gradiente, exeplo de um outro tipo de gradiente, onde o gradiente se incia do meio para as bordas. ",
            "1.4.16 - Volta para a versão de gradiente anterior, novo algoritimo para determinar  HSL, centralização do menu, adição de margem inferior no painel de amostras ",
            "1.4.17 - Correção bug comando de voz, Correçao do BUG que ao clicar em recomeçar se perdia o histórico, correção do reset vertical, inclusão do nome do autor.",
            "1.4.18 - Correção da mensagem comando de voz quando o microfone está desabilitado.",
            "1.4.19 - Mensagem com o tempo de inserção do item de mixage, exibição do tempo de acordo com a posição do cursor no painel e  uma mudança do calculo da posição do mouse em relação ao painel (offSet).  ",
            "1.4.20 - Alteração da velocidade de movimento do painel, exibição do tempo relativo ao curso no final do painel e posição de inserção de item.  ",
            "1.4.21 - Implementação da passagem do parâmetro pixel por segundo via url, correção de inserção de item na trilha 79 e 80, melhorias na exibição de tempo relativo ao cursor.  ",
            "1.4.22 - BUG: alterar um item de mixagem, alterava também as propriedades do evento de log de inserção (corrigido), Aumento da largura do container, implementação de ícones descritivos e alteração da versão de exportação JSON.  ",
            "1.4.23 - Menu de icones descritivos apenás com ícones, mudança no mecanismo de inserção de ícone descritivo no painel e amostras de aúdio agrupadas em um menu horizontal.",
            "1.4.24 - BUGs: erro ao continuar a partir e um arquivo JSON no SoundSphere e erro ao exibir ícone descritivo no leitor JSON (corrigidos), implementação da lista de amostras disponíveis com barra de rolagem.",
            "1.4.25 - BUGs: Menu principal: botão play não aparece e Mensagem da amostra que está sendo executada não aparecendo (corrigidos); Redesenhar painel ao inserir um ícone descritivo; Removido título das amostras de áudio e inclusão de uma descrição através de um tooltip;  No painel sempre inserir no local do clique, volta do comportamento de mover a visualização caso exista colisão e exibição do tempo no curso não colide mais com a grade de tempo; Alteração no tamanho do conteúdo da página para ficar mais harmônico com o novo tamanho do menu; Itens descritivos saiu do dropdown para ser um menu independente; Opção de exclusão no menu principal.",
            "1.4.26 - Tooltip no menu principal, alterações de algumas mensagens e alternância entre menus.",
            "1.4.27 - Ajuste de comportamento do deslocamento do painel ao mudar de menus; mudança do cursor no painel na situação de excluir  e editar; Alteração do tempo do painel para 60 minutos.",
            "1.4.28 - Alteração do comportamento do comando de reprodução em relação a posição do painel.",
            "1.4.29 - Ajuste ao ativar e desativar o excluir, mudança na função de parar a reprodução de uma amostra de áudio no álbum e alteração dos ícones.",
            "1.5 - Versão estável.",
            "1.5.1 - Correção do bug de ao pausar não desativar o excluir.",
            "1.5.2 - Ao continuar uma mixagem agora só é exigido os arquivos WAV que tenham algum Item de Mixagem no painel. Logo, os arquivos nunca utilizados ou que tenham sido inseridos e posteriormente todos os seus Itens de mixagem removidos não são mais exigidos. No leitor JSON em Dados gerais:  foi alterado o campo 'Quantidade de amostras disponíveis' para 'Quantidade de Amostras Carregadas em Todas as sessões’; Removido o campo 'Quantidade de Amostras Diferentes Utilizadas' e incluído os campos 'Quantidade de Amostras Diferentes Utilizadas contando excluídas' e ‘Quantidade de Amostras Diferentes na mixagem final' .",
            "1.5.3 - Correção do BUG que não exibia os ícones das amostras de audios.",
            "1.5.4 - Inclusão de mensagem de erro ao utilizar outros navegadores que não seja o Google Chrome.",
        ];
        //**************************************** */
        // ATENÇÃO LEMBRAR DE TROCAR VERSÃO
        //**************************************** */
        this.version = "1.5.4";
        this.JSONFileStructureVersion = "1.4.8";
        this.beta = true;
    }
    getVersion() {
        return this.version;
    }
    getFullName() {
        return `${this.name} - ${this.version}`;
    }
    getColorTitle() {
        return this.beta ? "red" : "black";
    }
}
