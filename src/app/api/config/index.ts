export class Languages {
  language: boolean | null;

  constructor() {
    if (typeof window !== "undefined") {
      this.language = localStorage.getItem("language") == "true" ? true : false;
    } else {
      this.language = false;
    }
  }

  English = {
    headerTitle: "Create Note",
    headerDescription: "Here you can create notes",
    title: "Title",
    description: "Description",
    tags: "Tags",
    saveButton: "Save Note",
    cancelButton: "Cancel",
    noteSaved: "Note Created successfully",
    noteNotSaved: "Error to created note",
    errorTitle: "Write the title",
    errorDescription: "Write description",
    errorTags: "Add one tag. =)",
    LoginButton: "Login",
    optionNote: "My Notes",
    optionNotes: "All Notes",
    profile: "Profile",
    language: "Language",
    theme: "Theme",
    logout: "Logout",
    login: "Login",
    welcome: "Welcome to Glance.",
    user: "User",
    pass: "Password",
    created: "~ Create account ツ",
    name: "Name",
    register: "Register",
    ErrorName: "Add your Name",
    ErrorEmail: "Add your User",
    ErrorPass: "Add your Pass",
  };

  Spanish = {
    headerTitle: "Crear Nota",
    headerDescription: "Aqui puede crear una nota.",
    title: "Titulo",
    description: "Descripción",
    tags: "Etiquetas",
    saveButton: "Guardar Nota",
    cancelButton: "Cancelar",
    noteSaved: "Nota creada!!",
    noteNotSaved: "Error al crear nota..",
    errorTitle: "Escribe el titulo",
    errorDescription: "Escribe la descripcion",
    errorTags: "Agrega una etiqueta. =)",
    LoginButton: "Login",
    optionNote: "Mis Notas",
    optionNotes: "Notas",
    profile: "Perfil",
    language: "Idioma",
    theme: "Tema",
    logout: "Salir",
    login: "Iniciar Sesion",
    welcome: "Bienvenido a Glance.",
    user: "Usuario",
    pass: "Contraseña",
    created: "~ Crear cuenta ツ",
    name: "Nombre",
    register: "Registrar",
    ErrorName: "Ingresa tu Nombre",
    ErrorEmail: "Ingresa tu Usuario",
    ErrorPass: "Ingresa tu Contraseña",
  };

  setLanguage = (): any => {
    if (localStorage.getItem("language") == "true") {
      localStorage.setItem("language", "false");
      this.language = false;
    } else {
      localStorage.setItem("language", "true");
      this.language = true;
    }
  };

  getLanguage(): boolean | null {
    return this.language;
  }
}
