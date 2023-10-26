import { Helmet } from "react-helmet-async";
import {
  Cake,
  Ruler,
  Weight,
  Utensils,
  XOctagon,
  NutOff,
  MilkOff,
  WheatOff,
  FishOff,
} from "lucide-react";
import { Separator } from "@ui/separator";
import {
  ageRangeMessage,
  heightMessage,
  weightMessage,
  dietaryPreferenceMessage,
  generateAllergyMessage,
  bmiCategoryDescription,
} from "@/lib/utils";
import { bmiCategories } from "@/lib/constants";

const UserHealthProfile = () => {
  const userInfoString = localStorage.getItem("userInfo")!;
  const userInfo = JSON.parse(userInfoString);
  const healthDataString = localStorage.getItem("healthData")!;
  const healthData = JSON.parse(healthDataString);

  const birthDate = new Date(healthData.dateOfBirth);
  const formattedBirthDate = birthDate.toISOString().split("T")[0];
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();

  const allergyIcons = {
    "Frutos secos": <NutOff className="h-5 w-5 mr-1 text-primary" />,
    "Productos lácteos": <MilkOff className="h-5 w-5 mr-1 text-primary" />,
    "Trigo y gluten": <WheatOff className="h-5 w-5 mr-1 text-primary" />,
    Mariscos: <FishOff className="h-5 w-5 mr-1 text-primary" />,
  };

  const userBmi = parseFloat(healthData.bmi);
  let userCategory = "No disponible";

  for (const category of bmiCategories) {
    const rangeParts = category.range.split(" - ");
    const min = parseFloat(rangeParts[0]);
    const max = rangeParts[1] ? parseFloat(rangeParts[1]) : undefined;

    if (isNaN(min)) {
      // Handles cases like "Menor a 18.5" and "40 o más"
      const minText = rangeParts[0]
        .replace("Menor a", "")
        .replace("40 o más", "40");
      if (userBmi <= parseFloat(minText)) {
        userCategory = category.category;
        break;
      }
    } else if (max === undefined) {
      if (userBmi >= min) {
        userCategory = category.category;
        break;
      }
    } else {
      if (userBmi >= min && userBmi <= max) {
        userCategory = category.category;
        break;
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Perfil de Salud | Artiheal</title>
      </Helmet>
      <div className="flex flex-row justify-center mb-6">
        <div className="rounded-xl bg-background shadow-xl w-full sm:w-9/12 p-4 flex flex-col items-center">
          <h1 className="mb-4 text-tertiary font-bold text-xl">
            Datos de Salud
          </h1>
          <div className="flex flex-col items-center gap-3 sm:items-start sm:gap-4 mx-2 sm:mx-5">
            <p className="text-sm sm:text-base">
              ¡Hola,{" "}
              <span className="font-bold text-primary">
                {userInfo.firstName}
              </span>
              ! A continuacion te mostramos un analisis del informe resumido
              acerca tus datos de salud.
            </p>
            <span className="text-xs sm:text-sm text-muted-foreground">
              (Ten en cuenta que a medida que tu salud evolucione, tambien los
              datos de este informe)
            </span>

            <div className="my-2 text-sm sm:text-base">
              <span className="font-bold text-primary flex flex-row">
                <Cake className="h-5 w-5 mr-1 text-primary" />
                Fecha de Nacimiento: {formattedBirthDate}
              </span>
              <p>
                Tienes{" "}
                <span className="font-semibold text-primary">{age} años.</span>{" "}
                {ageRangeMessage(age)}
              </p>
            </div>

            <div className="my-2 text-sm sm:text-base">
              <span className="font-bold text-primary flex flex-row">
                <Ruler className="h-5 w-5 mr-1 text-primary" />
                Altura (cm): {healthData.height}cm
              </span>
              <p>{heightMessage(healthData.height)}</p>
            </div>

            <div className="my-2 text-sm sm:text-base">
              <span className="font-bold text-primary flex flex-row">
                <Weight className="h-5 w-5 mr-1 text-primary" />
                Peso (kg): {healthData.weight}kg
              </span>
              <p>{weightMessage(healthData.weight)}</p>
            </div>

            <Separator />

            <div className="my-2 text-sm sm:text-base">
              <span className="font-bold text-primary flex flex-row">
                <Utensils className="h-5 w-5 mr-1 text-primary" />
                Preferencias de Dieta
              </span>
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center my-3 gap-4">
                <img
                  className="rounded-xl w-[250px]"
                  src={
                    healthData.dietaryPreference === "Sin Lactosa"
                      ? "https://github.com/VinuSion/Artiheal/assets/56313573/30d5da41-e992-4b77-9475-1c4a828aea9f"
                      : healthData.dietaryPreference === "NA"
                      ? "https://github.com/VinuSion/Artiheal/assets/56313573/6d255995-eaad-4b86-bfa6-92f114712cb5"
                      : healthData.dietaryPreference === "Vegano"
                      ? "https://github.com/VinuSion/Artiheal/assets/56313573/b1b0b7be-150f-4f70-aec8-f9c91fdd8387"
                      : healthData.dietaryPreference === "Vegetariano"
                      ? "https://github.com/VinuSion/Artiheal/assets/56313573/67da3deb-7b91-4067-98d7-dcfc6fb342ea"
                      : "https://github.com/VinuSion/Artiheal/assets/56313573/30bd5a0b-ba04-4b2a-ad65-4b84655de86c"
                  }
                  alt="dietary_preference_image"
                />
                <p>{dietaryPreferenceMessage(healthData.dietaryPreference)}</p>
              </div>
            </div>

            <Separator />

            <div className="my-2 text-sm sm:text-base w-full flex flex-col">
              <span className="font-bold text-primary flex flex-row">
                <XOctagon className="h-5 w-5 mr-1 text-primary" />
                Alergias
              </span>
              <div className="my-3 gap-4 flex flex-col justify-stretch space-y-3">
                {healthData.allergies.map((allergy: string, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <span className="text-primary font-bold flex flex-row">
                      {
                        (allergyIcons as { [key: string]: React.ReactElement })[
                          allergy
                        ]
                      }
                      {allergy}:
                    </span>{" "}
                    {generateAllergyMessage(allergy)}
                  </div>
                ))}
                {healthData.allergies.length === 0 && (
                  <div className="p-4 border rounded-lg">
                    <span className="text-primary">
                      No tienes alergias conocidas.
                    </span>{" "}
                    <p>¡Mantén una alimentación saludable y segura!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center mb-6">
        <div className="rounded-xl bg-background shadow-xl w-full sm:w-9/12 p-4 flex flex-col items-center">
          <h1 className="mb-4 text-tertiary font-bold text-xl">
            Indice de Masa Corporal (IMC)
          </h1>
          <div className="flex flex-col items-center gap-3 sm:gap-4 mx-2 sm:mx-5">
            {age < 18 ? (
              <p className="text-sm sm:text-base">
                Debido a que estás en una etapa de{" "}
                <span className="text-primary">crecimiento constante</span>, el
                IMC no es necesariamente aplicable en tu caso.
              </p>
            ) : (
              <>
                <table className="table-auto border">
                  <thead className="border">
                    <tr>
                      <th className="px-4 py-2 border bg-primary text-background">
                        Categoría
                      </th>
                      <th className="px-4 py-2 border bg-primary text-background">
                        Rango IMC
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bmiCategories.map((category) => (
                      <tr
                        key={category.category}
                        className={`border ${
                          userCategory === category.category
                            ? "bg-slate-500 text-background"
                            : "bg-background text-foreground"
                        }`}
                      >
                        <td className="border px-4 py-2">
                          {category.category}
                        </td>
                        <td className="border px-4 py-2">{category.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-sm text-muted-foreground">
                  Subrayado con color{" "}
                  <span className="text-xs p-[3px] rounded-sm bg-slate-500 text-background">
                    gris oscuro
                  </span>
                </p>
                <p className="text-sm sm:w-1/2 sm:text-base">
                  Tu índice de masa corporal (IMC) es{" "}
                  <span className="text-primary font-bold">
                    {healthData.bmi}
                  </span>
                  . Según tu IMC, te encuentras en la categoría de{" "}
                  <span className="text-primary font-bold">
                    "{userCategory}"
                  </span>
                  . {bmiCategoryDescription(userCategory)}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* "https://github.com/VinuSion/Artiheal/assets/56313573/30d5da41-e992-4b77-9475-1c4a828aea9f"  NON LACTOSE */
}
{
  /* "https://github.com/VinuSion/Artiheal/assets/56313573/6d255995-eaad-4b86-bfa6-92f114712cb5"  REGULAR */
}
{
  /* "https://github.com/VinuSion/Artiheal/assets/56313573/b1b0b7be-150f-4f70-aec8-f9c91fdd8387"  VEGAN */
}
{
  /* "https://github.com/VinuSion/Artiheal/assets/56313573/67da3deb-7b91-4067-98d7-dcfc6fb342ea"  VEGETARIAN */
}

export default UserHealthProfile;
