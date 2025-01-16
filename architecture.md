# 1. ARCHITEKTURA

## 1.1 Schéma a popis architektury
Tato kapitola podrobně popisuje, jak jsme nasadili NoSQL databázi (MongoDB) v rámci clusteru se třemi shardovanými replikovými sadami a dvěma routery.  
• V řešení využíváme tři konfigurační servery (Config Server Replica Set) pro správu metadat.  
• Dvě instance mongos (Router 1, Router 2) jako vstupní body pro klienty.  
• Tři shardy (Shard1, Shard2, Shard3), každý sestává z replikové sady se třemi uzly (Primární, Sekundární, Sekundární).  

Proč tato architektura:  
• Umožňuje horizontální škálování (sharding) a vysokou dostupnost (replikace).  
• Odchylka od doporučeného používání: Pro testovací účely provozujeme dva routery místo více, což je však stále prakticky použitelné pro demonstraci.

```mermaid
flowchart LR
 subgraph Application["Application"]
    direction TB
        A["Application"]
        D["Driver"]
  end
 subgraph Routers["Routers"]
    direction LR
        M1["Mongos Router 1"]
        M2["Mongos Router 2"]
  end
 subgraph ConfigServers["ConfigServers"]
    direction TB
        CS1["Config Server 1"]
        CS2["Config Server 2"]
        CS3["Config Server 3"]
  end
 subgraph Shard1["Shard1"]
    direction TB
        S1P["Shard 1 Primary"]
        S1S1["Shard 1 Secondary 1"]
        S1S2["Shard 1 Secondary 2"]
  end
 subgraph Shard2["Shard2"]
    direction TB
        S2P["Shard 2 Primary"]
        S2S1["Shard 2 Secondary 1"]
        S2S2["Shard 2 Secondary 2"]
  end
 subgraph Shard3["Shard3"]
    direction TB
        S3P["Shard 3 Primary"]
        S3S1["Shard 3 Secondary 1"]
        S3S2["Shard 3 Secondary 2"]
  end
    A --> D
    D --> M1 & M2
    M1 --> CS1 & CS2 & CS3 & S1P & S2P & S3P
    M2 --> CS1 & CS2 & CS3 & S1P & S2P & S3P

    style A fill:#00509e,font-color:#ffffff,stroke:#003f7e,stroke-width:2px,color:#FFFFFF
    style D fill:#00509e,font-color:#ffffff,stroke:#003f7e,stroke-width:2px,color:#FFFFFF
    style M1 fill:#dda500,font-color:#000000,stroke:#cc8400,stroke-width:2px
    style M2 fill:#ffa500,font-color:#000000,stroke:#cc8400,stroke-width:2px
    style CS1 fill:#009e73,font-color:#ffffff,stroke:#007d5d,stroke-width:2px,color:#FFFFFF
    style CS2 fill:#009e73,font-color:#ffffff,stroke:#007d5d,stroke-width:2px,color:#FFFFFF
    style CS3 fill:#009e73,font-color:#ffffff,stroke:#007d5d,stroke-width:2px,color:#FFFFFF
    style S1P fill:#4b0082,font-color:#ffffff,stroke:#3a0066,stroke-width:2px,color:#FFFFFF
    style S1S1 fill:#9370db,font-color:#ffffff,stroke:#7a5bc1,stroke-width:2px
    style S1S2 fill:#9370db,font-color:#ffffff,stroke:#7a5bc1,stroke-width:2px
    style S2P fill:#007acc,font-color:#ffffff,stroke:#005fa1,stroke-width:2px,color:#FFFFFF
    style S2S1 fill:#40bfff,font-color:#ffffff,stroke:#3399cc,stroke-width:2px
    style S2S2 fill:#40bfff,font-color:#ffffff,stroke:#3399cc,stroke-width:2px
    style S3P fill:#e63946,font-color:#ffffff,stroke:#b22d37,stroke-width:2px,color:#FFFFFF
    style S3S1 fill:#f88379,font-color:#ffffff,stroke:#cc6c6a,stroke-width:2px
    style S3S2 fill:#f88379,font-color:#ffffff,stroke:#cc6c6a,stroke-width:2px
    style Application fill:#cc5555,stroke:#000000,stroke-width:1px
    style Routers fill:#00bbaa,stroke:#000000,stroke-width:1px
    style ConfigServers fill:#E1BEE7,stroke:#000000,stroke-width:1px,color:#000000
    style Shard1 fill:#eebb33,stroke:#000000,stroke-width:1px
    style Shard2 fill:#eebb33,stroke:#000000,stroke-width:1px
    style Shard3 fill:#eebb33,stroke:#000000,stroke-width:1px
```

## 1.2 Specifika konfigurace

### 1.2.1 CAP teorém
• Splněny garance Partition tolerance (P) a nastavitelná míra Consistency (C).  
• Pro dané použití je dostatečné, protože preferujeme dostupnost a horizontální škálovatelnost.  

### 1.2.2 Cluster
• Používáme jeden logický cluster pro konsolidaci dat.  
• Vyhovuje požadavkům na výkon a snadnou údržbu.  

### 1.2.3 Uzly
• Minimálně 3 uzly v každé replikové sadě.  
• Zajišťují vyšší dostupnost a odolnost vůči výpadkům.  

### 1.2.4 Sharding
• Tři shardy z důvodu rovnoměrného rozložení dat.  
• Počet je dostačující pro současnou velikost dat.  

### 1.2.5 Replikace
• Každý shard replikován ve třech instancích.  
• Chrání data před lokálními selháními a podporuje škálování čtení.  

### 1.2.6 Perzistence dat
• Databáze ukládá data na disk s write-ahead logem.  
• Primární paměť využívána pro cache a indexy, sekundární pro dlouhodobé uložení.  
• Data načtena přímo do RAM, zápisy potvrzeny interními mechanismy.  

### 1.2.7 Distribuce dat
• Data rozdělena dle shard klíče, replikována v rámci shardů.  
• Routery obsluhují dotazy a distribuci pro čtení/zápis.  

### 1.2.8 Zabezpečení
• Autentizace a autorizace s admin účtem a rolemi.  
• Klíčový soubor pro šifrovanou repliku a šifrovanou komunikaci v clusteru.