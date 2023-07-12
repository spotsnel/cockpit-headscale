export type HeadscaleNode = {
    id:                     number;
    machine_key:            string;
    node_key:               string;
    disco_key:              string;
    ip_addresses:           string[];
    name:                   string;
    user:                   User;
    last_seen:              CreatedAt;
    last_successful_update: CreatedAt;
    expiry:                 Expiry;
    created_at:             CreatedAt;
    given_name:             string;
    online?:                boolean;
}

export type CreatedAt = {
    seconds: number;
    nanos:   number;
}

export type Expiry = {
    seconds: number;
}

export type User = {
    id:         string;
    name:       string;
    created_at: CreatedAt;
}
