import React, { useEffect, useState } from "react";
import { EuiProvider } from "@elastic/eui";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Main } from "./components/Main/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigurationPage } from "./components/Configuration-page/Configuration-page";
import {
  ConfigurationElasticsearch,
  ConfigurationKibana,
  ConfigurationLogstash,
} from "./components/Configuration-components";
import { ConfigService, ElasticsearchService, EngineService } from "./services";
import { Status } from "./types";
import "./App.scss";

const configService = new ConfigService();
const engineService = new EngineService();
const elasticsearchService = new ElasticsearchService();

function App() {
  const [globalStatus, setGlobalStatus] = useState<Status>("off");
  const [eStatus, setEStatus] = useState<Status>("off");
  const [lStatus, setLStatus] = useState<Status>("off");
  const [kStatus, setKStatus] = useState<Status>("off");
  const [isMiniApp, setIsMiniApp] = useState<boolean>(false);

  useEffect(() => {
    elasticsearchService.elasticsearchEmitter.subscribe(setEStatus);

    elasticsearchService.init();

    return () => {
      elasticsearchService.close();
    };
  }, []);

  useEffect(() => {
    setGlobalStatus("off");

    if (eStatus === "on" || kStatus === "on" || lStatus === "on") {
      setGlobalStatus("on");
    }

    if (
      eStatus === "loading" ||
      kStatus === "loading" ||
      lStatus === "loading"
    ) {
      setGlobalStatus("loading");
    }
  }, [eStatus, lStatus, kStatus]);

  const renderRoutes = () => (
    <Routes>
      <Route
        path="/"
        element={<Main engineService={engineService} status={globalStatus} />}
      />
      <Route
        path="/elasticsearch"
        element={
          <ConfigurationPage
            status={eStatus}
            configService={configService}
            module={"elasticsearch"}
            elasticsearchService={elasticsearchService}
            pageComponent={
              <ConfigurationElasticsearch
                configService={configService}
                status={eStatus}
              />
            }
          />
        }
      />
      <Route
        path="/kibana"
        element={
          <ConfigurationPage
            status={kStatus}
            configService={configService}
            module={"kibana"}
            elasticsearchService={elasticsearchService}
            pageComponent={
              <ConfigurationKibana
                configService={configService}
                status={kStatus}
              />
            }
          />
        }
      />
      <Route
        path="/logstash"
        element={
          <ConfigurationPage
            status={lStatus}
            configService={configService}
            module={"logstash"}
            elasticsearchService={elasticsearchService}
            pageComponent={
              <ConfigurationLogstash
                configService={configService}
                status={lStatus}
              />
            }
          />
        }
      />
    </Routes>
  );

  return (
    <EuiProvider colorMode="light">
      <BrowserRouter>
        <div className={`App ${isMiniApp ? "Reduced" : ""}`}>
          <Header onReduceWindow={setIsMiniApp} />
          {!isMiniApp && (
            <>
              <div className="Main">{renderRoutes()}</div>
              <Footer eStatus={eStatus} kStatus={kStatus} lStatus={lStatus} />
            </>
          )}
        </div>
      </BrowserRouter>
    </EuiProvider>
  );
}

export default App;
