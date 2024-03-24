import React from "react";
import "./Elk-button.scss";
import { EuiIcon, EuiLoadingElastic } from "@elastic/eui";

interface ElkButtonProps {
  isLoading: boolean;
  onClick: () => void;
  isClickDisabled: boolean;
}

export function ElkButton({
  isLoading,
  onClick,
  isClickDisabled,
}: ElkButtonProps) {
  return (
    <div className="Container">
      <a
        className="Button"
        style={{ cursor: isClickDisabled ? "not-allowed" : "pointer" }}
        onClick={() => {
          if (!isClickDisabled) onClick();
        }}
        // href='www.google.com'
      >
        {isLoading ? (
          <EuiLoadingElastic className="Elk-picture Elk-picture-loader" />
        ) : (
          <EuiIcon className="Elk-picture" type="logoElastic" />
        )}
      </a>
      {isLoading && <div className="Loader rotate" />}
    </div>
  );
}
