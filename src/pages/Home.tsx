import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import "./Home.css";
import { videocamOutline } from "ionicons/icons";

//import movie api
import { useEffect, useState } from "react";
import useApi, { SearchResult, SearchType } from "../hooks/useApi";

const Home: React.FC = () => {
  const { searchData } = useApi();

  //states to hold search keyword, type and results
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [presentAlert] = useIonAlert();
  const [loading, dismiss] = useIonLoading();

  useEffect(() => {
    if (searchTerm === "") {
      setResults([]);
      return;
    }

    const loadData = async () => {
      const res: any = await searchData(searchTerm, type);
      console.log("Lele bhai sara movies ka data", res);
      await dismiss();
      if (res?.Error) {
        presentAlert(res.Error);
      } else {
        setResults(res.Search);
      }
    };

    loadData();
  }, [searchTerm, type]);

  const showClickResponse = () => {
    presentAlert(
      "Abhi hum itne ameer nahi hain! Jab paise honge tab dikha denge movie"
    );
  };

  return (
    <IonPage>
      {/* App title */}
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>
            <span>Movies</span>
            <span style={{ color: "black" }}>Hub</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Search bar to enter search words */}
        <IonSearchbar
          value={searchTerm}
          debounce={10000}
          onIonChange={(e) => setSearchTerm(e.detail.value!)}
        ></IonSearchbar>

        {/* Search type select option */}
        <IonItem>
          <IonLabel>Select an option</IonLabel>
          <IonSelect value={type} onIonChange={(e) => setType(e.detail.value!)}>
            <IonSelectOption value="">All</IonSelectOption>
            <IonSelectOption value="movie">Movie</IonSelectOption>
            <IonSelectOption value="series">Series</IonSelectOption>
            <IonSelectOption value="episode">Episode</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonList>
          {results.map((item: SearchResult) => (
            <IonItem key={item.imdbID}>
              <IonAvatar slot="start">
                <IonImg src={item.Poster}></IonImg>
              </IonAvatar>
              <IonLabel>{item.Title}</IonLabel>
              <IonIcon
                slot="end"
                icon={videocamOutline}
                onClick={showClickResponse}
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
