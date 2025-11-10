# language: pt

Funcionalidade: Calculadora básica
  Como usuário
  Quero realizar operações básicas
  Para obter resultados corretos

  Contexto:
    Dado abro a calculadora

  Esquema do Cenário: Soma
    Quando pressiono a sequência "<seq>"
    Então o visor deve mostrar "<resultado>"

    Exemplos:
      | seq   | resultado |
      | 2+3=  | 5         |
      | 7+5=  | 12        |
      | 9+0=  | 9         |

  Esquema do Cenário: Subtração
    Quando pressiono a sequência "<seq>"
    Então o visor deve mostrar "<resultado>"

    Exemplos:
      | seq   | resultado |
      | 8-3=  | 5         |
      | 3-8=  | -5        |

  Esquema do Cenário: Multiplicação
    Quando pressiono a sequência "<seq>"
    Então o visor deve mostrar "<resultado>"

    Exemplos:
      | seq     | resultado |
      | 6*7=    | 42        |
      | 2.5*4=  | 10        |

  Esquema do Cenário: Divisão
    Quando pressiono a sequência "<seq>"
    Então o visor deve mostrar "<resultado>"

    Exemplos:
      | seq   | resultado |
      | 20/5= | 4         |
      | 7/2=  | 3.5       |

  Cenário: Divisão por zero
    Quando pressiono a sequência "8/0="
    Então o visor deve mostrar "Erro"

  Cenário: Limpar entrada
    Quando pressiono a sequência "9"
    E pressiono "btn-C"
    Então o visor deve mostrar "0"

  Cenário: Trocar sinal
    Quando pressiono a sequência "9"
    E pressiono "btn-sign"
    Então o visor deve mostrar "-9"

  Cenário: Porcentagem
    Quando pressiono a sequência "5%"
    Então o visor deve mostrar "0.05"

  # Política adotada no componente: execução imediata
  Cenário: Encadeamento imediato
    Quando pressiono a sequência "2+3*4="
    Então o visor deve mostrar "20"
