import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    defaultUnit,
    leafletMapContext,
    mapGeoLocation,
    questions,
} from "../utils/context";
import { iconColors } from "../maps/api";
import * as turf from "@turf/turf";
import { useStore } from "@nanostores/react";
import {
    MatchingQuestionComponent,
    RadiusQuestionComponent,
    TentacleQuestionComponent,
    ThermometerQuestionComponent,
} from "./QuestionCards";

export function QuestionSidebar() {
    const $questions = useStore(questions);

    return (
        <Sidebar>
            <h2 className="ml-4 mt-4 font-poppins text-2xl">Questions</h2>
            <SidebarContent>
                {$questions.map((question, index) => {
                    switch (question.id) {
                        case "radius":
                            return (
                                <RadiusQuestionComponent
                                    data={question.data}
                                    key={question.key}
                                    questionKey={question.key}
                                    index={index}
                                />
                            );
                        case "thermometer":
                            return (
                                <ThermometerQuestionComponent
                                    data={question.data}
                                    key={question.key}
                                    questionKey={question.key}
                                    index={index}
                                />
                            );
                        case "tentacles":
                            return (
                                <TentacleQuestionComponent
                                    data={question.data}
                                    key={question.key}
                                    questionKey={question.key}
                                    index={index}
                                />
                            );
                        case "matching":
                            return (
                                <MatchingQuestionComponent
                                    data={question.data}
                                    key={question.key}
                                    questionKey={question.key}
                                    index={index}
                                />
                            );
                        default:
                            return null;
                    }
                })}
            </SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Add Question</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => {
                                    const map = leafletMapContext.get();
                                    if (!map) return;

                                    const center = map.getCenter();

                                    questions.set([
                                        ...$questions,
                                        {
                                            id: "radius",
                                            key: Math.random() * 1e9,
                                            data: {
                                                radius: 50,
                                                unit: defaultUnit.get(),
                                                lat: center.lat,
                                                lng: center.lng,
                                                within: false,
                                                color: Object.keys(iconColors)[
                                                    Math.floor(
                                                        Math.random() *
                                                            Object.keys(
                                                                iconColors
                                                            ).length
                                                    )
                                                ] as keyof typeof iconColors,
                                                drag: true,
                                            },
                                        },
                                    ]);
                                }}
                            >
                                Add Radius
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => {
                                    const map = leafletMapContext.get();
                                    if (!map) return;

                                    const center = map.getCenter();

                                    const destination = turf.destination(
                                        [center.lng, center.lat],
                                        5,
                                        90,
                                        {
                                            units: "miles",
                                        }
                                    );

                                    questions.set([
                                        ...$questions,
                                        {
                                            id: "thermometer",
                                            key: Math.random() * 1e9,
                                            data: {
                                                colorA: Object.keys(iconColors)[
                                                    Math.floor(
                                                        Math.random() *
                                                            Object.keys(
                                                                iconColors
                                                            ).length
                                                    )
                                                ] as keyof typeof iconColors,
                                                colorB: Object.keys(iconColors)[
                                                    Math.floor(
                                                        Math.random() *
                                                            Object.keys(
                                                                iconColors
                                                            ).length
                                                    )
                                                ] as keyof typeof iconColors,
                                                latA: center.lat,
                                                lngA: center.lng,
                                                latB: destination.geometry
                                                    .coordinates[1],
                                                lngB: destination.geometry
                                                    .coordinates[0],
                                                distance: 5,
                                                warmer: true,
                                                drag: true,
                                            },
                                        },
                                    ]);
                                }}
                            >
                                Add Thermometer
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => {
                                    const map = leafletMapContext.get();
                                    if (!map) return;

                                    const center = map.getCenter();

                                    questions.set([
                                        ...$questions,
                                        {
                                            id: "tentacles",
                                            key: Math.random() * 1e9,
                                            data: {
                                                color: Object.keys(iconColors)[
                                                    Math.floor(
                                                        Math.random() *
                                                            Object.keys(
                                                                iconColors
                                                            ).length
                                                    )
                                                ] as keyof typeof iconColors,
                                                lat: center.lat,
                                                unit: defaultUnit.get(),
                                                lng: center.lng,
                                                drag: true,
                                                location: false,
                                                locationType: "theme_park",
                                                radius: 15,
                                            },
                                        },
                                    ]);
                                }}
                            >
                                Add Tentacles
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => {
                                    const map = leafletMapContext.get();
                                    if (!map) return;

                                    const center = map.getCenter();

                                    questions.set([
                                        ...$questions,
                                        {
                                            id: "matching",
                                            key: Math.random() * 1e9,
                                            data: {
                                                color: Object.keys(iconColors)[
                                                    Math.floor(
                                                        Math.random() *
                                                            Object.keys(
                                                                iconColors
                                                            ).length
                                                    )
                                                ] as keyof typeof iconColors,
                                                lat: center.lat,
                                                lng: center.lng,
                                                drag: true,
                                                same: true,
                                                type: "zone",
                                                cat: {
                                                    adminLevel: 3,
                                                },
                                            },
                                        },
                                    ]);
                                }}
                            >
                                Add Matching
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </Sidebar>
    );
}
