import React from "react";
import { EuiButton, EuiHealth, EuiText } from "@elastic/eui";
import "./Main.scss";
import pkg from "../../../package.json";

import { ElkButton } from "../Elk-button/Elk-button";
import { ConfigService } from "../../services/ConfigService";
import { Status } from "../../types";
import { EngineService } from "../../services";

interface MainProps {
  status: Status;
  engineService: EngineService;
}

export function Main({ status, engineService }: MainProps) {
  const launch = () => {
    if (status === "on") {
      engineService.off();
    } else if (status === "off") {
      engineService.on();
    }
  };

  return (
    <div className="Main-container Main-page">
      <div className="Connection-header">
        <EuiHealth color={ConfigService.prompt[status].color}>
          {ConfigService.prompt[status].text}
        </EuiHealth>
        <EuiText size="s">v{pkg.version}</EuiText>
      </div>

      <ElkButton
        isLoading={status === "loading"}
        isClickDisabled={status === "loading" || status === "off"}
        onClick={console.log}
      />

      <div>
        <EuiText size="xs" textAlign="center">
          {status === "off"
            ? ""
            : status === "loading"
            ? "Elk is launching, this may take a few moment"
            : "Click on Elk to open the browser"}
        </EuiText>
      </div>

      <div className="Button-group">
        <EuiButton
          isDisabled={status === "loading"}
          aria-label="button"
          fullWidth
          onClick={launch}
        >
          {status === "loading" || status === "off" ? "Launch Elk" : "Stop Elk"}
        </EuiButton>
      </div>
    </div>
  );
}
