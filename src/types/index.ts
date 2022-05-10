export type Nft = {
  id: number;
  name: string;
  image_url: string;
  owner: {
    profile_img_url: string;
    user: {
      username: string;
    };
  };
};

export type APIResponse = {
  assets: Nft[];
  next: string;
  previous: string;
};
