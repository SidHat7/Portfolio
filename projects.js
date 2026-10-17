/* Données des projets : modifier ici pour mettre à jour le site.
   cats : detection | reseau | crypto | gouvernance | dev | offensif
   featured : affiché en page d'accueil (dans l'ordre du tableau)
   repo : lien vers un dépôt GitHub dédié (laisser vide s'il n'existe pas) */
window.PROJECTS = [
  {
    id: 'detection',
    featured: true,
    title: 'Chaîne de détection & supervision',
    cats: ['detection'],
    context: 'Licence 3 · Module Cryptographie & Cybersécurité',
    summary: "Mise en place d'une chaîne défensive complète : sondes réseau et hôte, supervision de l'infrastructure, scan de vulnérabilités et corrélation des événements dans un SIEM.",
    diagram: true,
    did: [
      "Déploiement de Snort 3 en NIDS et écriture de règles personnalisées (TCP, UDP, ICMP) pour détecter scans Nmap, tentatives de DoS et connexions suspectes",
      "Mise en place d'AIDE comme HIDS : base de référence d'intégrité (SHA-256), simulation de modifications de fichiers critiques et analyse des rapports",
      "Supervision des hôtes et services (HTTP, SSH, CPU, RAM, disque) avec Nagios Core et NRPE, alertes en cas d'incident",
      "Centralisation et corrélation des journaux Snort, AIDE et Nagios dans le SIEM OSSIM, puis analyse des alarmes",
      "Scans de vulnérabilités avec Nessus Essentials, priorisation par score CVSS et recommandations de remédiation"
    ],
    tags: ['Snort 3', 'AIDE', 'Nagios', 'NRPE', 'OSSIM', 'Nessus', 'CVSS', 'Wireshark'],
    parts: ['Snort — IDS réseau', 'AIDE — IDS hôte', 'Nagios — supervision', 'OSSIM — SIEM', 'Nessus — vulnérabilités']
  },
  {
    id: 'pki',
    featured: true,
    title: 'PKI interne & cryptographie appliquée',
    cats: ['crypto'],
    context: 'Licence 3 · Module Cryptographie & Cybersécurité',
    summary: "Construction d'une infrastructure à clé publique avec OpenSSL et exploitation de ses certificats pour HTTPS, la signature de documents et le chiffrement.",
    did: [
      "Création d'une autorité racine (RSA-4096, clé protégée en AES-256) puis d'une autorité intermédiaire, émission de certificats serveur et client X.509",
      "Gestion du cycle de vie des certificats et de la révocation (CRL)",
      "Serveur Apache en HTTPS avec les certificats de la PKI : TLS 1.2/1.3 uniquement, protocoles obsolètes désactivés, suites de chiffrement choisies, handshake vérifié avec Wireshark",
      "Signature de documents PDF (PAdES) avec un certificat de la PKI et vérification de l'intégrité",
      "Chiffrement et signature avec GnuPG (RSA-4096) et construction d'une toile de confiance entre pairs",
      "Étude détaillée d'AES (rounds, S-Box, MixColumns, GF(2⁸)) et chiffrement AES-256-CBC avec OpenSSL ; fondamentaux RSA et Diffie-Hellman"
    ],
    tags: ['OpenSSL', 'X.509', 'CRL', 'TLS 1.3', 'Apache', 'GnuPG', 'PAdES', 'AES', 'RSA'],
    parts: ['PKI Root CA', 'HTTPS Apache', 'Signature PDF', 'GnuPG', 'AES', 'RSA / Diffie-Hellman']
  },
  {
    id: 'lonatraffic',
    featured: true,
    title: 'LONATraffic — IoT sécurisé & PSSI',
    cats: ['gouvernance', 'dev'],
    context: 'Licence 3 · Projet IoT et module Cybersécurité · équipe de 4 · 2025–2026',
    summary: "Système IoT de détection des infractions aux feux de circulation, conçu avec la sécurité intégrée dès le départ, accompagné de sa politique de sécurité (PSSI).",
    did: [
      "Capteurs (ultrason HC-SR04, infrarouge TCRT5000) sur Arduino Mega, passerelle Node.js sur Raspberry Pi 4",
      "API REST Express.js et base PostgreSQL, tableau de bord temps réel en WebSocket, alertes SMS et email",
      "Sécurisation : TLS 1.3, authentification JWT RS256, double authentification TOTP, contrôle d'accès par rôles (RBAC)",
      "Rédaction de la PSSI : modélisation des menaces STRIDE, matrice des risques, contre-mesures (AES-256-GCM, bcrypt, liste blanche IP) et conformité à la loi marocaine 09-08 sur les données personnelles"
    ],
    tags: ['Arduino', 'Raspberry Pi', 'Node.js', 'PostgreSQL', 'WebSocket', 'JWT', '2FA TOTP', 'STRIDE', 'ISO 27001'],
    parts: ['Système IoT', 'PSSI & analyse de risques']
  },
  {
    id: 'vpn',
    featured: true,
    title: 'VPN & accès distant sécurisé',
    cats: ['reseau', 'crypto'],
    context: 'Licence 3 · Module Cryptographie & Cybersécurité',
    summary: "Trois façons de sécuriser un accès distant : VPN IPsec entre sites, OpenVPN avec authentification par certificats, et SSH durci.",
    did: [
      "VPN IPsec site à site sur Cisco IOS (ISAKMP : AES-256, SHA, DH groupe 5 ; transform-set ESP-AES) et sous Linux avec StrongSwan en IKEv2",
      "OpenVPN hôte à hôte avec PKI EasyRSA 3, TLS-Auth contre les attaques DoS et vérification du tunnel dans Wireshark",
      "Durcissement d'OpenSSH : clés Ed25519, connexion root interdite, AllowUsers, port non standard, fail2ban contre la force brute",
      "Tunnels SSH local, distant et SOCKS5, analyse du trafic chiffré"
    ],
    tags: ['IPsec', 'IKEv2', 'StrongSwan', 'Cisco IOS', 'OpenVPN', 'EasyRSA', 'OpenSSH', 'fail2ban'],
    parts: ['VPN IPsec', 'OpenVPN', 'OpenSSH']
  },
  {
    id: 'reseau',
    featured: true,
    title: 'Sécurisation & filtrage réseau',
    cats: ['reseau'],
    context: 'Licence 3 · Modules Réseaux et Sécurité réseau',
    summary: "Conception de topologies segmentées et filtrage du trafic, côté équipements Cisco comme côté pare-feu Linux.",
    did: [
      "Topologies Cisco Packet Tracer : VLAN, routage inter-VLAN, DHCP (Windows Server et Linux), routage dynamique",
      "ACL Cisco standard et étendues (source, destination, port, protocole), placement sur les interfaces et tests de validation",
      "Pare-feu Netfilter/iptables : politiques de filtrage INPUT, OUTPUT et FORWARD, suivi de connexions, NAT (MASQUERADE, DNAT, SNAT)"
    ],
    tags: ['Cisco IOS', 'Packet Tracer', 'VLAN', 'DHCP', 'ACL', 'iptables', 'Netfilter', 'NAT'],
    parts: ['Topologies Cisco', 'ACL', 'Pare-feu iptables']
  },
  {
    id: 'kerberos',
    featured: true,
    title: 'Authentification centralisée Kerberos / SSO',
    cats: ['crypto'],
    context: 'Licence 3 · Module Cryptographie & Cybersécurité',
    summary: "Déploiement d'un centre de distribution de clés Kerberos et intégration avec SSH pour une authentification unique sans mot de passe.",
    did: [
      "Installation et configuration de MIT Kerberos 5 (KDC), création du royaume, des principals et des keytabs",
      "Obtention des tickets TGT et TGS avec kinit",
      "Intégration SSO avec OpenSSH pour une connexion transparente par ticket"
    ],
    tags: ['Kerberos 5', 'KDC', 'SSO', 'TGT / TGS', 'OpenSSH'],
    parts: []
  },
  {
    id: 'lab-offensif',
    title: 'Lab offensif — comprendre l\'attaquant',
    cats: ['offensif'],
    context: 'Licence 3 et entraînement personnel',
    summary: "Environnement de test sous Kali Linux pour reproduire les techniques d'attaque que la défense doit savoir détecter.",
    did: [
      "Reconnaissance et énumération : Nmap, Amass, Dirb",
      "Exploitation de vulnérabilités en environnement isolé avec Metasploit",
      "Audit de mots de passe (Hashcat, John the Ripper) et de réseaux Wi-Fi (aircrack-ng)",
      "Salles et CTF sur TryHackMe"
    ],
    tags: ['Kali Linux', 'Nmap', 'Metasploit', 'Hashcat', 'aircrack-ng', 'TryHackMe'],
    parts: []
  },
  {
    id: 'prog-systeme',
    title: 'Programmation système & réseau en C',
    cats: ['dev'],
    context: 'Licence 3 · Module Programmation système',
    summary: "Applications client-serveur et mécanismes de communication inter-processus sous Unix.",
    did: [
      "Chat client-serveur multi-clients en C : sockets TCP et un thread POSIX par client",
      "Analyse du trafic dans Wireshark : poignée de main TCP, segments, fermeture de connexion",
      "IPC Unix : pthreads et mutex (producteur/consommateur), signaux, tubes nommés et anonymes, famille exec()"
    ],
    tags: ['C', 'Sockets TCP/UDP', 'pthreads', 'IPC', 'Signaux', 'Wireshark'],
    parts: []
  },
  {
    id: 'hotel',
    title: 'Gestion hôtelière — base de données',
    cats: ['dev'],
    context: 'Licence · Université Cadi Ayyad',
    summary: "Modélisation et réalisation d'une base de données hôtelière avec une interface web de gestion.",
    did: [
      "Modèle entité-association, MCD/MLD et schéma relationnel SQLite",
      "Interface de gestion en Python avec Streamlit, requêtes SQL"
    ],
    tags: ['Python', 'SQLite', 'SQL', 'Streamlit'],
    parts: []
  },
  {
    id: 'jeu-cpp',
    title: 'Jeu 2D en C++',
    cats: ['dev'],
    context: 'Licence · Université Cadi Ayyad',
    summary: "Jeu 2D développé en C++ orienté objet avec la bibliothèque SDL2.",
    did: [
      "Architecture orientée objet : états de jeu, entités, gestion des collisions",
      "Boucle de jeu, rendu et gestion des entrées avec SDL2"
    ],
    tags: ['C++', 'POO', 'SDL2'],
    parts: []
  },
  {
    id: 'bigdata',
    title: 'Big Data & transformation digitale',
    cats: ['dev'],
    context: 'Licence 3 · Module Big Data',
    summary: "Étude de l'écosystème Big Data et des bases NoSQL dans un contexte de transformation digitale.",
    did: [
      "Hadoop, HDFS et MapReduce ; bases NoSQL document, colonne, graphe et clé-valeur",
      "Théorème CAP et méthodologie CRISP-DM"
    ],
    tags: ['Hadoop', 'HDFS', 'NoSQL', 'CRISP-DM'],
    parts: []
  }
];

window.PROJECT_CATS = {
  detection: 'Détection',
  reseau: 'Réseau',
  crypto: 'Crypto & identité',
  gouvernance: 'Gouvernance',
  offensif: 'Offensif',
  dev: 'Développement'
};
