import { builder, Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

Builder.registerComponent(
  dynamic(() => import("./components/Counter/Counter")),
  {
    name: "Counter",
  }
);

Builder.registerComponent(
  dynamic(() => import("./pages/about")),
  {
    name: "About",
  }
);

Builder.registerComponent(
  dynamic(() => import("./pages/[...page]")),
  {
    name: "Page",
  }
);

Builder.registerComponent(
  dynamic(() => import("./pages/add-book")),
  {
    name: "AddBook",
  }
);

Builder.registerComponent(
  dynamic(() => import("./pages/books/[id]")),
  {
    name: "Book",
  }
);

Builder.registerComponent(
  dynamic(() => import("./study-next/pages/books/[id]")),
  {
    name: "Book",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/Comments")),
  {
    name: "Comments",
  }
);

Builder.registerComponent(
  dynamic(() => import("./pages/book-guessing-game")),
  {
    name: "BookGuessingGame",
  }
);

Builder.registerComponent(
  dynamic(
    async () => (await import("./context/ReadLaterContext")).ReadLaterProvider
  ),
  {
    name: "ReadLaterProvider",
  }
);

Builder.registerComponent(
  dynamic(() => import("./pages/read-later")),
  {
    name: "ReadLaterPage",
  }
);
