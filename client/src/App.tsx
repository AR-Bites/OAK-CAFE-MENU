import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Beverages from "@/pages/beverages";
import Food from "@/pages/food";
import ProductDetail from "@/pages/product-detail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/beverages" component={Beverages} />
      <Route path="/food" component={Food} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/food-product/:id" component={ProductDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
