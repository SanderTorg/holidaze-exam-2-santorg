export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: { url: string; alt?: string };
  banner?: { url?: string; alt?: string };
  venueManager?: boolean;
}

export interface RegisterResponse {
  data: {
    name: string;
    email: string;
    bio?: string;
    avatar?: { url: string; alt: string };
    banner?: { url: string; alt: string };
    venueManager: boolean;
  };
  meta: Record<string, unknown>;
}
