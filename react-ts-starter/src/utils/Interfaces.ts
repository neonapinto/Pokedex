export interface IPokemonType{
   pokemon : {
    name: string,
    url: string
   };
}

export interface INameUrl{
  name: string;
  url: string;
}

export interface IAbility{
  ability? : {
    name?: string,
    url?: string;
  },
  className: string
}

export interface IStatProps{
    base_stat: number;
    stat:{
        name: string
    }
}

export interface IPokemonInfo {
  abilities?: IAbility[]
  base_experience?:  number;
  forms?: [];
  game_indices?: [];
  held_items?:[];
  id?: number;
  is_default?: boolean;
  location_area_encounters?: string;
  moves?: [];
  name?: string;
  order?: number;
  past_types?: [];
  species?: {};
  weight?: number;
  height?: number;
  sprites?:{
    front_default?: string,
    back_default?: string
  },
  stats?:IStatProps[];
  types?: [{
    type:{
      name: string;
    }
  }];
}

export interface ITypeDetails{
  "data":{
      damage_relations: {
        double_damage_from : [
          name: string,
          url: string
        ];
      };
      game_indices: [];
      generation: {};
      move_damage_class: {};
      moves:[];
      name: string;
      names: [];
      past_damage_relations: [];
      pokemon: [
         IPokemonType[]
      ];
  }
}

export interface IWeaknessType{
  name: string;
  url: string;
}

export interface ILocalStorage{
    pokemon: string;
    type: string[];
    info: IPokemonInfo;
}

export interface IButtonProps{
  name: string;
  className: string;
  handleClick: () => void;
}

export interface IAvatarProps{
  front_default?: string;
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?:string;
}

export interface IProgressNumber{
  step: number;
}

export interface IProgressDivider{
  className: string;
}

export interface IUserProps{
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

/**
 * Interface for the Error handling in User form
 */
export interface IErrorProps{
  firstName: boolean;
  lastName: boolean;
  phone: boolean;
  address: boolean;
}

/**
 * Form Props for the User form
 */
export interface IFormProps{
  formData: IUserProps;
  handleFormData: (e:React.ChangeEvent<HTMLInputElement>) => void;
  errors: IErrorProps;
  handleValidate: () => void;
}


export interface IModalProps{
  isShowing: boolean;
  hide: () => void;
}