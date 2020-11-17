# A Recipe for Success - Gruppe 47

## Hvordan kjøre prosjektet?

### 1. Installere pakker

- For å kjøre prosjektet er Expo nødt til å lastes ned globalt på maskinen. For å installere, kjører du følgende kommando i teminalen: `npm install expo-cli --global`.

- Etter å ha klonet prosjektet, kjør `cd frontend && npm install` i terminalen for å installere pakkene for prosjektet.

### 2. Starte Expo (på mobil)

Backend kjøres på NTNU sin virtuelle maskin, det er derfor kun nødvendig å starte klienten via frontend-mappen i prosjektet.

- Kjør `npm start` i terminalen inne i frontend-mappen.

- Last ned Expo-appen på mobilen din og scann QR-koden. Husk at mobilen og pcen må være på samme lokalnett

## Om Prosjektet

Vi har valgt oppgave A), og etter tilbakemeldinger fra forrige prosjekt har vi valgt å fokusere på riktig implementering av typescript. I samtale med faglærer har vi avtalt at dette var en fin vri på prosjektet, og har derfor fokusert spesielt på å implementere Redux, Apollo client og graphql med typescript. Vi har gjenbrukt kode fra prosjekt 3 så langt det lar seg gjøre. Dette har vi kunnet gjøre med det meste av funksjonaliteten, og noe av stylingen. Dette har gitt oss muligheten til å utforske gjenbruksmulighetene av kode mellom React web applikasjon og React Native. Vi har valgt å gjenbruke backenden vår slik den var fra prosjekt 3 og dermed ikke gjort noen endringer i denne.

## Om Nettsiden

A Recipe for Success er en app som lar en søke på oppskrifter og filtrere oppskriftene på dinner, breakfast og dessert. Når bruker kjører prosjektet, viser startsiden de første femten oppskriftene som lastes inn i alfabetisk rekkefølge, helt ufiltrert. Hver oppskrift vises med tittel og bilde. Femten nye oppskrifter lastes dynamisk inn dersom bruker scroller ned til bunnen (pagination). Når bruker trykker på en av oppskriftene åpnes en modal som viser flere detaljer som ingredienser og fremgangsmåte.

- [React Native](#react_native)
- [Refactor av Redux](#refactor-av-redux)
- [Pagination](#pagination)
- [GraphQL og Apollo Client](#rest-og-graphql)
- [Søk, Filtrering og Sortering](#søk,-filtrering-og-sortering)
- [Manuell Ende-til-Ende Testing](#manuell-ende-til-ende-testing)
- [Bruk av Git](#bruk-av-git)

## React Native

Expo CLI ble lastet ned globalt. For å opprette prosjektet brukte vi `expo init project4 --npm`, for å bruke npm i stedet for yarn for å laste ned pakkene. Vi har installert flere pakker for å håndtere de forskjellige kravene:

- **styled-components:** for CSS-styling av komponenter.
- **graphql:** spørrespråk for å laste data fra APIet til applikasjonen.
- **"@apollo/client":** administrere data med GraphQL.
- **redux-thunk:** brukt for å opprette en store. Det er et middleware som kan håndtere actions som ikke er et vanlig objekt. De tar inn dispatch som et argument og kan kalle det asynkront.
- **react-native-elements:** importerte checkbox-element for filtrering og sortering.
- **react-native-gesture-handler:** importerte ScrollView for å rendre alle komponentene.
- **react-redux:** for å håndtere den globale staten.
- **[Denne](https://levelup.gitconnected.com/using-styled-components-with-react-native-de645fcf4787)** linken som gir inspirasjon til layout for recipeCard.

For å gjenbruke eksisterende kode fra prosjekt 3, ble vi nødt til å ta i bruk komponenter fra styled components sitt React Native-bibliotek i stedet for React. Det innebar blant annet omskrivning som at komponenter, som at div ble til View. Ellers viste det seg svært nyttig at vi hadde gjort oss kjent med bruk av styled components i prosjekt 3 ettersom det ga et solid grunnlag for stylingen i dette prosjektet. Vi fikk i tillegg erfare at vår responsive logikk ved bruk av grid ikke kunne brukes i React Native. Dermed måtte vi endre logikken til å ta i bruk flex i stedet. Videre utforsket vi bruk av tredjepartskomponenter både for å gi mulighet for å ta i bruk checkboxer, og for at man skal kunne scrolle i modalen.

## Refactor av Redux

Redux er en global state manager som wrappes rundt hele appen, slik at staten kan hentes hvor som helst. Redux blir brukt til å håndtere søk og filtrering, der hele resultatsettet blir sortert til tross for dynamisk innlasting av oppskriftene. I tillegg har vi brukt den til å håndtere pagination. I dette prosjektet har vi refactoret hele Redux-logikken slik at den er implementert ved bruk av typescript. Dette innebar å definere action og app state typer, koble typer til actions og reducers, samt å koble typene til store og middleware (thunk). Dessuten måtte alle useSelector-funksjonene skrives om for å vise til AppState og type.

## Pagination

For å hente oppskriftene dynamisk ved pagination har vi brukt Apollo Client sin funksjon useQuery slik at vi enkelt kan hente flere oppskrifter med fetchMore. fetchMoreRecipes() har flere switch-statements slik at dynamisk innlasting også skjer dersom noen av checkboxene er huket av eller med search. Dette er også implementert med typescript.

## GraphQL og Apollo Client

Vi har brukt GraphQL for å lettere hente ut nøyaktig data som vi ønsker å bruke. For å hente data fra backend har vi brukt Apollo Client. Apollo er kompatibel med alle GraphQl servere, og er også enkelt å koble opp med Redux. Ved å bruke innebygde funksjoner som useQuery og useMutation, kan vi enkelt se innlastingen og håndtere feilmeldinger. I initApollo.tsx oppretter vi Apollo Client, som wrappes rundt hele appen i en provider. Her har det også blitt endringer for å gjøre om til typescript, ved å definere typer for graphql queries.

## Søk, Filtrering og Sortering

Vi har mulighet for å søke på oppskrift ved navn ved å skrive inn tekst i søkefeltet, ved inntasting filtreres resultatet på navn dynamisk, men vi har valgt å beholde søk knappen som vil søke på ordet i søkefeltet. Dette har vi gjort ved å bruke React Native sin textinput og lage en useState i recipes som holder rede på søkeverdien lokalt, denne verdien blir så oppdatert i redux som da vil oppdatere resultatet ved å hente ut search queries med søkeordet. I backend er det brukt regex, slik at man ikke trenger å søke på eksakt tittel, men vil få opp oppskrifter som inneholder søke verdien. Dette gjør at man kan både søke på deler av navnet til en oppskrift og hele oppskriften. Dersom søkeordet ikke eksistere vil siden være helt blank. Sortering fungerer bare på hele resultatsettet, vi fikk tilbakemelding på dette på forrige prosjekt og vurderte om vi skulle ta inn søk på de forskjellige kategoriene. På grunn av valget om å fokusere på typescript og ikke endre på backend, valgte vi derfor ikke å prioritere dette.

Det er mulig å filtrere på middag, frokost og dessert. Dette gjøres ved å trykke på checkboxes i sidemenyen. Man får da opp oppskrifter i denne kategorien. Kun én av kategori-checkboxene kan være huket av på samme tid. Vi valgte denne løsningen da vi mente det var fornuftig, siden man vanligvis ønsker kun å se på en av kategoriene av gangen, og pga hvordan vi har implementert backend.

For Sortering har vi gjort det på samme måte som filtrering ved å ha checkboxes for å filtrere alfabetisk på navn. Vi har en global state, sortDecending, som er satt til true. Ved å klikke på en av checkboxene blir staten oppdatert og oppskriftene blir hentet ut i tilsvarende sortering fra backend. Dette er også mulig når man har huket av for en kategori.

Redux er brukt for å holde rede på endringene som blir gjort ved filtrering, sortering og søk, ved å oppdatere hvilken queries som brukes for å fetche data.

## Manuell Ende-til-Ende Testing

Applikasjonen er testen manuelt gjennom Expo sin app for iOS. Da ingen i gruppen har tilgang til android telefon har vi ikke fått testet applikasjonen på android.

Ved testing av søkefeltet merket vi at denne ikke fungerte helt optimalt, ved noen anledninger vises feil oppskrifter mens man skriver ordet, men når et fullstendig ord er skrevet vil den hente ut riktig resultater.

Manuell testing av checkbox fungerer slik som vi hadde tenkt, hvis vi klikker på en kategori vil checkboxen hukes av, klikker man på en annen kategori checkbox vil den første checkboxen deaktiveres. Det er i tillegg mulig å aktivere både en kategori checkbox og sorterings checkboxen.

Etter å ha inspisert siden ser vi også at de oppskriftene som har veldig langt navn vil ikke hele navnet vises i cardContaineren som vi har wrappet bildet og tittelen i.

Scrolling fungerer dynamisk, men den hakker litt som gjør at det ikke blir like sømløst som ønsket. I tillegg greier vi ikke å scrolle helt ned slik at noen elementer ikke nås. Dette har vi søkt opp og fant ut av var et vanlig problem med FlatList, vi har prøvd mange ulike metoder for å fikse dette, men uten hell.

Modalen fungerer som ønsket, vi har også fått fikset buggen fra sist prosjekt slik at det er mulig å trykke på samme oppskrift to ganger.

## Bruk av Git

For å samarbeide om prosjektet har vi brukt Git. Git gir mulighet til å lage issues, slik at det er lettere å fordele oppgaver og ha oversikt over progresjon i prosjektet. Vi har nummerert hvert issue og gitt det et beskrivende navn, som vi har branchet ut i fra. I tillegg har hvert issue blitt tildelt egne labels som beskriver status, prioritet og hvilken hensikt branchen har (type). Vi har også prøvd å være så konsekvente som mulig med å skrive beskrivende commits, slik at de er lett å forstå hvis man går tilbake til dem. Vi har prøvd å følge git standarder og hatt en egen develop branch, som vi brancher ut i fra, og til slutt merget develop inn i master.
