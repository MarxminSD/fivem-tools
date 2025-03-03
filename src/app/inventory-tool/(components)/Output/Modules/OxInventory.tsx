import { Item } from "@/stores/useItemConfigStore";

export const generateOxInventoryConfig = (item: Item): string => {
	if (!item.name || !item.label) return "";

	const { animationData } = item;
	const hasClient = item.isUsable && item.useTime;
	const hasAnim = hasClient && animationData.animationDict && animationData.animationClip;
	const hasModel = animationData.modelHash && animationData.modelHash.trim() !== ""; // Check for a valid model hash

	// Validation checks for invalid values
	const validBone = animationData.modelBone && !isNaN(Number(animationData.modelBone)) && Number(animationData.modelBone) !== 0;
	const validWeight = item.weight && !isNaN(Number(item.weight)) && Number(item.weight) !== 0;
	const validDescription = item.description && item.description.length > 0;

	// Always include position and rotation, even if values are zero
	const posString = `pos = vector3(${animationData.modelPosition?.x || 0}, ${animationData.modelPosition?.y || 0}, ${animationData.modelPosition?.z || 0})`;
	const rotString = `rot = vector3(${animationData.modelRotation?.x || 0}, ${animationData.modelRotation?.y || 0}, ${animationData.modelRotation?.z || 0})`;

	// Only include bone and weight if they are valid numbers
	const boneString = validBone ? `BoneID = ${animationData.modelBone}` : "";
	const weightString = validWeight ? `weight = ${item.weight}` : "";

	// Only include description if it's valid and non-empty
	const descriptionString = validDescription ? `description = "${item.description}"` : "";

	let propComponents = [
		`
			model = "${animationData.modelHash}"`,
		posString,
		rotString,
		boneString,
	]
		.filter(Boolean)
		.join(",\n            ");

	let propBlock = hasModel ? `prop = { ${propComponents} \n        }` : "";

	let animBlock = hasAnim
		? `anim = {	
            dict = "${animationData.animationDict}", 
            clip = "${animationData.animationClip}" 
        }`
		: "";

	let clientProps = [animBlock, propBlock].filter(Boolean).join(",\n        ");

	let useTimeString = item.useTime ? `usetime = ${item.useTime}` : "";
	let clientString = hasClient
		? `client = {\n        ${useTimeString}${clientProps ? `\n        ${clientProps}` : ""}
    }`
		: "";

	let properties = [`label = '${item.label}'`, weightString, descriptionString, clientString].filter(Boolean).join(",\n    ");

	return `['${item.name}'] = {\n    ${properties}\n},\n`;
};
