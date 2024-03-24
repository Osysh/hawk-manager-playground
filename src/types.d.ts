export type Elk = "elasticsearch" | "kibana" | "logstash";

export type Status = "loading" | "on" | "off";

export interface ElasticsearchConfig {
  jvm_size: number;
  password: string;
  port: number;
}
