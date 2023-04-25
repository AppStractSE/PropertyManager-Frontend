import * as style from "@dicebear/adventurer";
import { createAvatar } from "@dicebear/core";
import { useEffect, useState } from "react";
import { Button, Nav, Tab } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useClient } from "../contexts/ClientContext";
import { useUser } from "../contexts/UserContext";
import { avatarOptions } from "../data/avatarOptions";
import toasts from "../data/toasts";

const CreateAvatar = () => {
  const [eyes, setEyes] = useState("variant01");
  const [skinColor, setSkinColor] = useState("f2d3b1");
  const [mouth, setMouth] = useState("variant01");
  const [earrings, setEarrings] = useState("variant02");
  const [eyebrows, setEyebrows] = useState("variant11");
  const [glasses, setGlasses] = useState("none");
  const [hair, setHair] = useState("long19");
  const [hairColor, setHairColor] = useState("ac6511");
  const avatar = createAvatar(style, {
    flip: true,
    size: 168,
    eyes: [eyes as any],
    skinColor: [skinColor as any],
    mouth: [mouth as any],
    earrings: [earrings as any],
    eyebrows: [eyebrows as any],
    glasses: [glasses as any],
    glassesProbability: glasses === "none" ? 0 : 100,
    hair: [hair as any],
    hairColor: [hairColor as any],
  }).toString();

  const avatarToSave = createAvatar(style, {
    flip: true,
    size: 168,
    eyes: [eyes as any],
    skinColor: [skinColor as any],
    mouth: [mouth as any],
    earrings: [earrings as any],
    eyebrows: [eyebrows as any],
    glasses: [glasses as any],
    glassesProbability: glasses === "none" ? 0 : 100,
    hair: [hair as any],
    hairColor: [hairColor as any],
  }).toString();

  const blob = new Blob([avatarToSave], { type: "image/svg+xml" });
  const file = new File([blob], "avatar.svg", { type: "image/svg+xml" });
  console.log(avatarToSave);

  const [currentAvatar, setCurrentAvatar] = useState(avatar);
  const client = useClient();
  const queryClient = useQueryClient();
  const currentUser = useUser();

  useEffect(() => {
    if (currentAvatar !== avatar) setCurrentAvatar(avatar);
  }, [avatar]);

  const { mutate: postImage, isLoading: postingImage } = useMutation(
    async () => {
      if (!file) {
        throw new Error("File is missing");
      }
      await client.blob_UploadBlob(
        currentUser.currentUser.user?.userId,
        file?.name.split(".").pop(),
        {
          data: file,
          fileName: "profile",
        },
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["choreImages", currentUser.currentUser.user?.userId]);
        toast.success(toasts.images.onMutate.message);
      },
      onError: () => {
        toast.warning(toasts.generic.onError.message);
      },
    },
  );
  return (
    <>
      <Button onClick={() => postImage()}>Spara avatar</Button>
      <img
        src={`https://propertyfilesystem.blob.core.windows.net/fddff525-58e3-423b-ab63-8cfae2bdd997/profile.svg`}
        height='80'
        width='80'
      />
      <Tab.Container defaultActiveKey='eyebrows'>
        <div className='d-flex align-items-center my-3'>
          <Nav variant='pills' className='d-flex flex-row flex-wrap gap-1 color-primary avatar'>
            <Nav.Item>
              <Nav.Link
                className='w-fit-content py-2 px-2 rounded border border-primary d-flex align-items-center'
                eventKey='hair'
              >
                <svg
                  version='1.0'
                  xmlns='http://www.w3.org/2000/svg'
                  width='28.000000pt'
                  height='28.000000pt'
                  viewBox='0 0 128.000000 128.000000'
                  preserveAspectRatio='xMidYMid meet'
                  fill='currentColor'
                >
                  <g
                    transform='translate(0.000000,128.000000) scale(0.100000,-0.100000)'
                    stroke='none'
                  >
                    <path
                      d='M483 1046 c-63 -20 -109 -53 -127 -90 -9 -19 -16 -39 -16 -45 0 -6
-7 -11 -15 -11 -46 0 -125 -63 -157 -125 -28 -53 -39 -191 -15 -182 13 5 17
-5 22 -51 13 -109 35 -195 65 -256 17 -33 28 -50 25 -36 -2 14 -10 62 -16 106
-18 134 18 256 86 295 30 18 31 17 90 -12 120 -59 235 -62 356 -9 79 35 103
37 146 10 56 -34 95 -139 109 -294 6 -73 8 -77 20 -55 27 49 54 153 54 213 1
57 2 60 16 41 14 -18 15 -16 8 35 -8 71 -47 190 -79 239 -51 81 -141 148 -223
166 -41 9 -37 13 19 24 l44 8 -54 16 c-69 21 -190 22 -238 2 -40 -17 -52 -13
-33 10 11 13 8 15 -16 14 -16 0 -48 -6 -71 -13z'
                    />
                  </g>
                </svg>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className='w-fit-content py-2 px-2 rounded border border-primary d-flex align-items-center'
                eventKey='mouth'
              >
                <svg
                  version='1.0'
                  xmlns='http://www.w3.org/2000/svg'
                  width='28.000000pt'
                  height='28.000000pt'
                  viewBox='0 0 128.000000 128.000000'
                  preserveAspectRatio='xMidYMid meet'
                  fill='currentColor'
                >
                  <g
                    transform='translate(0.000000,128.000000) scale(0.100000,-0.100000)'
                    stroke='none'
                  >
                    <path
                      d='M350 977 c-114 -47 -350 -228 -350 -269 0 -23 124 -172 205 -246 252
-230 578 -238 844 -19 74 60 231 243 231 268 0 38 -241 221 -350 266 -30 12
-68 23 -85 23 -35 0 -106 -31 -152 -66 -40 -31 -59 -30 -106 2 -56 37 -118 64
-152 64 -16 0 -55 -11 -85 -23z m134 -51 c18 -8 52 -28 76 -45 60 -44 99 -42
173 9 98 66 141 63 265 -17 82 -52 192 -135 192 -145 0 -13 -67 -10 -317 13
l-232 21 -213 -21 c-118 -11 -242 -21 -277 -21 -58 0 -62 1 -50 17 20 24 165
131 213 156 91 49 119 54 170 33z m316 -236 c178 -13 234 -20 223 -30 -16 -15
-178 -68 -263 -85 -60 -12 -107 -16 -160 -11 -82 6 -233 45 -308 78 l-47 21
55 9 c54 8 248 24 325 27 22 0 101 -3 175 -9z m-589 -73 c334 -155 525 -154
868 4 46 22 86 37 89 34 10 -10 -157 -171 -225 -215 -224 -148 -470 -127 -687
57 -73 62 -165 163 -149 163 6 0 53 -20 104 -43z'
                    />
                  </g>
                </svg>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className='w-fit-content py-2 px-2 rounded border border-primary d-flex align-items-center'
                eventKey='eyes'
              >
                <svg
                  version='1.0'
                  xmlns='http://www.w3.org/2000/svg'
                  width='28.000000pt'
                  height='28.000000pt'
                  viewBox='0 0 128.000000 128.000000'
                  preserveAspectRatio='xMidYMid meet'
                  fill='currentColor'
                >
                  <g
                    transform='translate(0.000000,128.000000) scale(0.100000,-0.100000)'
                    stroke='none'
                  >
                    <path
                      d='M531 1034 c-139 -30 -291 -122 -426 -260 -100 -102 -114 -124 -94
-160 22 -42 167 -185 240 -236 122 -87 281 -148 389 -148 108 0 267 61 389
148 73 51 218 194 240 236 20 36 6 58 -94 160 -137 140 -287 231 -430 261 -85
18 -130 18 -214 -1z m257 -100 c99 -33 224 -116 318 -211 41 -41 74 -79 74
-83 0 -15 -131 -143 -192 -188 -226 -167 -432 -174 -657 -25 -79 53 -231 193
-231 213 0 5 30 40 67 77 211 214 417 286 621 217z'
                    />
                    <path
                      d='M550 877 c-49 -16 -133 -102 -148 -153 -30 -101 -9 -188 63 -259 71
-72 158 -93 259 -63 55 16 138 99 154 154 30 101 9 188 -63 259 -71 71 -166
93 -265 62z m142 -77 c21 -6 51 -27 71 -49 64 -71 59 -170 -12 -234 -71 -64
-170 -59 -234 12 -61 68 -59 166 6 229 49 48 101 61 169 42z'
                    />
                  </g>
                </svg>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className='w-fit-content py-2 px-2 rounded border border-primary d-flex align-items-center'
                eventKey='eyebrows'
              >
                <svg
                  version='1.0'
                  xmlns='http://www.w3.org/2000/svg'
                  width='28.000000pt'
                  height='28.000000pt'
                  viewBox='0 0 128.000000 128.000000'
                  preserveAspectRatio='xMidYMid meet'
                  fill='currentColor'
                >
                  <g
                    transform='translate(0.000000,128.000000) scale(0.100000,-0.100000)'
                    stroke='none'
                  >
                    <path
                      d='M615 1034 c-205 -22 -404 -91 -557 -196 -52 -35 -79 -68 -45 -55 235
90 514 113 752 61 99 -22 155 -27 318 -31 138 -4 197 -2 197 5 0 17 -64 77
-123 117 -28 19 -88 50 -132 67 -76 30 -88 32 -225 34 -80 1 -163 0 -185 -2z'
                    />
                    <path
                      d='M177 619 c-23 -13 -21 -34 5 -59 l23 -21 -37 -68 c-32 -58 -36 -70
-24 -86 20 -28 48 -11 85 54 l34 59 70 -34 c38 -18 71 -35 73 -37 2 -2 -3 -23
-11 -47 -20 -56 -19 -96 2 -104 23 -9 40 10 62 74 10 30 24 54 30 52 6 -1 45
-7 86 -13 l74 -11 3 -61 c3 -63 19 -86 52 -74 12 5 16 20 16 71 l0 65 48 6
c26 4 64 11 85 16 20 6 41 8 46 5 4 -3 16 -27 26 -53 22 -60 32 -73 57 -73 30
0 33 28 9 93 -12 33 -20 61 -19 61 2 1 42 20 89 43 l87 42 31 -45 c33 -45 38
-48 65 -38 24 9 19 41 -10 80 -23 30 -25 38 -16 59 9 19 8 27 -4 40 -9 8 -18
15 -21 15 -3 0 -37 -20 -77 -44 -245 -153 -501 -178 -731 -72 -42 19 -98 51
-123 69 -64 46 -65 47 -85 36z'
                    />
                  </g>
                </svg>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className='w-fit-content py-2 px-2 rounded border border-primary d-flex align-items-center'
                eventKey='glasses'
              >
                <svg
                  version='1.0'
                  xmlns='http://www.w3.org/2000/svg'
                  width='28.000000pt'
                  height='28.000000pt'
                  viewBox='0 0 128.000000 128.000000'
                  preserveAspectRatio='xMidYMid meet'
                  fill='currentColor'
                >
                  <g
                    transform='translate(0.000000,128.000000) scale(0.100000,-0.100000)'
                    stroke='none'
                  >
                    <path
                      d='M285 831 c-23 -10 -54 -33 -69 -52 -16 -19 -40 -36 -54 -39 -31 -6
-41 -30 -15 -36 17 -5 20 -14 19 -62 0 -124 88 -212 214 -212 61 0 115 25 158
74 39 44 54 98 50 178 -3 60 -2 62 25 72 18 6 36 6 55 0 26 -10 27 -12 24 -77
-4 -81 10 -127 51 -173 42 -49 96 -74 157 -74 126 0 214 88 214 212 -1 48 2
57 19 62 26 6 16 30 -15 36 -14 3 -38 20 -54 39 -75 90 -234 94 -313 8 l-23
-25 -32 19 c-39 24 -73 24 -112 0 l-32 -19 -23 25 c-56 60 -166 80 -244 44z
m177 -37 c15 -8 40 -31 55 -51 24 -31 28 -46 28 -103 0 -57 -4 -72 -28 -103
-41 -54 -78 -70 -151 -65 -75 5 -120 33 -147 92 -24 54 -24 100 2 153 43 89
149 123 241 77z m526 -2 c73 -33 109 -135 77 -217 -25 -66 -72 -98 -150 -103
-74 -5 -111 11 -152 65 -24 31 -28 46 -28 103 0 57 4 72 28 103 56 74 135 91
225 49z'
                    />
                    <path
                      d='M302 744 c-26 -18 -55 -71 -47 -84 11 -17 24 -11 40 20 8 16 29 37
45 45 17 9 30 20 30 25 0 15 -43 12 -68 -6z'
                    />
                    <path d='M421 751 c-17 -11 -7 -41 13 -41 22 0 30 20 15 36 -9 8 -19 10 -28 5z' />
                    <path
                      d='M843 750 c-39 -23 -67 -64 -59 -85 8 -23 25 -18 36 10 5 14 26 35 45
46 28 17 33 24 24 35 -14 17 -8 18 -46 -6z'
                    />
                  </g>
                </svg>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className='w-fit-content py-2 px-2 rounded border border-primary d-flex align-items-center'
                eventKey='skincolor'
              >
                <svg
                  version='1.0'
                  xmlns='http://www.w3.org/2000/svg'
                  width='28.000000pt'
                  height='28.000000pt'
                  viewBox='0 0 128.000000 128.000000'
                  preserveAspectRatio='xMidYMid meet'
                  fill='currentColor'
                >
                  <g
                    transform='translate(0.000000,128.000000) scale(0.100000,-0.100000)'
                    stroke='none'
                  >
                    <path
                      d='M533 1226 c-61 -20 -107 -51 -157 -108 -55 -60 -88 -154 -85 -235 2
-46 -1 -55 -24 -73 -23 -19 -27 -29 -27 -75 0 -67 12 -99 50 -134 21 -18 35
-46 45 -86 9 -33 27 -77 40 -97 21 -32 25 -49 25 -116 0 -63 -4 -82 -18 -95
-10 -9 -87 -41 -172 -72 -164 -59 -181 -68 -163 -86 17 -17 329 97 365 132 25
24 28 35 28 88 l0 61 58 -45 57 -45 85 0 85 0 58 45 57 45 0 -61 c0 -53 3 -64
28 -88 36 -35 348 -149 365 -132 18 18 1 27 -163 86 -85 31 -162 63 -172 72
-14 13 -18 32 -18 95 0 67 4 84 25 116 13 20 31 64 40 97 10 40 24 68 45 86
38 35 50 67 50 134 0 44 -4 57 -23 72 -20 16 -25 30 -29 99 -4 58 -13 97 -32
136 -31 66 -108 141 -174 170 -59 27 -188 34 -249 14z m203 -41 c99 -29 180
-115 204 -216 22 -89 -17 -435 -57 -512 -8 -16 -47 -62 -87 -103 l-73 -74 -80
0 c-77 0 -81 1 -121 36 -65 55 -130 141 -143 186 -32 121 -55 387 -39 461 37
174 218 275 396 222z m-431 -471 c4 -36 4 -68 1 -71 -10 -10 -26 47 -26 93 0
67 17 53 25 -22z m695 22 c0 -46 -16 -103 -26 -93 -9 9 7 137 17 137 5 0 9
-20 9 -44z'
                    />
                  </g>
                </svg>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className='w-fit-content py-2 px-2 rounded border border-primary d-flex align-items-center'
                eventKey='haircolor'
              >
                <svg
                  version='1.0'
                  xmlns='http://www.w3.org/2000/svg'
                  width='28.000000pt'
                  height='28.000000pt'
                  viewBox='0 0 128.000000 128.000000'
                  preserveAspectRatio='xMidYMid meet'
                  fill='currentColor'
                >
                  <g
                    transform='translate(0.000000,128.000000) scale(0.100000,-0.100000)'
                    stroke='none'
                  >
                    <path
                      d='M278 1196 c-103 -33 -190 -64 -193 -68 -12 -11 25 -109 68 -182 23
-38 66 -143 98 -235 61 -179 60 -178 136 -180 27 -1 32 -6 38 -32 4 -17 14
-33 22 -36 16 -6 131 26 139 39 3 5 0 24 -6 44 -11 34 -11 36 30 72 l41 37
-36 105 c-49 144 -63 203 -79 322 -15 110 -37 179 -58 177 -7 -1 -97 -29 -200
-63z m196 -2 c10 -27 7 -44 -9 -44 -16 0 -36 39 -28 53 8 13 31 8 37 -9z m-70
-40 c5 -16 2 -23 -14 -27 -15 -4 -22 1 -26 20 -4 16 -2 28 7 34 16 9 24 3 33
-27z m-79 -14 c3 -11 3 -24 0 -30 -7 -12 -35 -14 -35 -2 0 4 -3 17 -6 30 -5
17 -2 22 14 22 12 0 23 -9 27 -20z m-79 -26 c10 -39 -17 -52 -33 -16 -8 20 -8
29 0 34 20 13 26 9 33 -18z m263 -115 c7 -41 27 -125 46 -185 19 -60 35 -114
35 -120 0 -6 -26 -14 -62 -17 -43 -4 -83 -16 -130 -40 l-67 -35 -37 112 c-20
61 -57 153 -82 204 -25 51 -43 93 -41 95 2 1 74 25 159 53 178 58 159 66 179
-67z m-336 89 c7 -25 1 -38 -18 -38 -13 0 -25 21 -25 46 0 23 37 16 43 -8z
m397 -454 c0 -3 -24 -16 -52 -29 -59 -26 -138 -42 -138 -28 0 8 68 43 110 57
21 6 80 7 80 0z m-32 -96 c4 -21 -67 -42 -75 -22 -7 18 4 30 32 37 28 6 40 3
43 -15z'
                    />
                    <path
                      d='M1098 1243 c-9 -10 -67 -116 -129 -235 l-114 -217 -67 -31 c-81 -38
-92 -49 -86 -97 4 -27 -2 -52 -19 -86 -13 -26 -21 -52 -18 -57 13 -22 33 -7
55 40 13 28 27 50 32 50 13 0 9 -18 -13 -61 -20 -41 -20 -69 1 -69 6 0 21 22
33 50 12 27 28 50 35 50 8 0 4 -17 -13 -50 -14 -28 -23 -55 -20 -60 13 -22 33
-7 55 40 31 65 46 54 16 -13 l-22 -52 -240 -5 -239 -5 0 -101 c0 -93 2 -104
27 -142 15 -23 46 -52 67 -64 35 -20 40 -28 43 -63 l3 -40 155 0 155 0 3 40
c3 35 8 43 43 63 21 12 52 41 67 64 25 38 27 50 29 151 1 122 13 162 49 171
42 11 50 45 30 134 l-18 77 101 230 c56 127 101 238 101 248 0 24 -36 57 -63
57 -13 0 -31 -8 -39 -17z m57 -34 c4 -6 -39 -116 -95 -246 l-103 -235 18 -79
c13 -56 15 -83 8 -90 -8 -8 -45 6 -127 44 -143 68 -146 78 -43 125 l72 32 105
201 c142 272 146 279 165 248z m-235 -689 c0 -16 -33 -80 -42 -80 -11 0 -10 4
8 50 15 37 34 54 34 30z m-21 -199 c-4 -85 -18 -114 -73 -155 -25 -19 -41 -21
-186 -21 -145 0 -161 2 -186 21 -55 41 -69 70 -73 155 l-3 79 262 0 262 0 -3
-79z m-139 -241 c0 -19 -7 -20 -120 -20 -113 0 -120 1 -120 20 0 19 7 20 120
20 113 0 120 -1 120 -20z'
                    />
                  </g>
                </svg>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <img src={`data:image/svg+xml;utf8,${encodeURIComponent(currentAvatar)}`} />
        </div>
        <Tab.Content>
          <Tab.Pane eventKey='haircolor'>
            <div className='my-2'>
              <div className='fs-5'>Hårfärg</div>
              <div className='fs-7 text-muted'>Välj hårfärg</div>
            </div>
            <div className='grid-avatar-creator mt-2'>
              {avatarOptions.hairColor.map((hairColorMap) => (
                <div key={hairColorMap} className='d-flex flex-column align-items-center'>
                  <img
                    className={`${
                      hairColorMap === hairColor
                        ? "opacity-1 border-1 border-primary border rounded"
                        : "border border-transparent opacity-50"
                    }`}
                    onClick={() => setHairColor(hairColorMap)}
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      createAvatar(style, {
                        earrings: [earrings as any],
                        eyebrows: [eyebrows as any],
                        eyes: [eyes as any],
                        glasses: [glasses as any],
                        hair: [hair as any],
                        skinColor: [skinColor as any],
                        mouth: [mouth as any],
                        hairColor: [hairColorMap as any],
                        glassesProbability: 100,
                        flip: true,
                        size: 80,
                      }).toString(),
                    )}`}
                  />
                </div>
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey='hair'>
            <div className='my-2'>
              <div className='fs-5'>Hår</div>
              <div className='fs-7 text-muted'>Välj hår</div>
            </div>
            <div className='grid-avatar-creator mt-2'>
              {avatarOptions.hair.map((hairMap) => (
                <div key={hairMap} className='d-flex flex-column align-items-center'>
                  <img
                    className={`${
                      hairMap === hair
                        ? "opacity-1 border-1 border-primary border rounded"
                        : "border border-transparent opacity-50"
                    }`}
                    onClick={() => setHair(hairMap)}
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      createAvatar(style, {
                        earrings: [earrings as any],
                        eyebrows: [eyebrows as any],
                        eyes: [eyes as any],
                        glasses: [glasses as any],
                        hair: [hairMap as any],
                        skinColor: [skinColor as any],
                        mouth: [mouth as any],
                        hairColor: [hairColor as any],
                        glassesProbability: 100,
                        flip: true,
                        size: 80,
                      }).toString(),
                    )}`}
                  />
                </div>
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey='glasses'>
            <div className='my-2'>
              <div className='fs-5'>Glasögon</div>
              <div className='fs-7 text-muted'>Välj glasögon</div>
            </div>
            <div className='grid-avatar-creator mt-2'>
              {avatarOptions.glasses.map((glassesMap) => (
                <div key={glassesMap} className='d-flex flex-column align-items-center'>
                  <img
                    className={`${
                      glassesMap === glasses
                        ? "opacity-1 border-1 border-primary border rounded"
                        : "border border-transparent opacity-50"
                    }`}
                    onClick={() => setGlasses(glassesMap)}
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      createAvatar(style, {
                        earrings: [earrings as any],
                        eyebrows: [eyebrows as any],
                        eyes: [eyes as any],
                        glasses: [glassesMap as any],
                        hair: [hair as any],
                        skinColor: [skinColor as any],
                        mouth: [mouth as any],
                        hairColor: [hairColor as any],
                        glassesProbability: 100,
                        flip: true,
                        size: 80,
                      }).toString(),
                    )}`}
                  />
                </div>
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey='eyebrows'>
            <div className='my-2'>
              <div className='fs-5'>Ögonbryn</div>
              <div className='fs-7 text-muted'>Välj ögonbryn</div>
            </div>
            <div className='grid-avatar-creator mt-2'>
              {avatarOptions.eyebrows.map((eyebrowMap) => (
                <div key={eyebrowMap} className='d-flex flex-column align-items-center'>
                  <img
                    className={`${
                      eyebrowMap === eyebrows
                        ? "opacity-1 border-1 border-primary border rounded"
                        : "border border-transparent opacity-50"
                    }`}
                    onClick={() => setEyebrows(eyebrowMap)}
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      createAvatar(style, {
                        earrings: [earrings as any],
                        eyebrows: [eyebrowMap as any],
                        eyes: [eyes as any],
                        glasses: [glasses as any],
                        hair: [hair as any],
                        skinColor: [skinColor as any],
                        mouth: [mouth as any],
                        hairColor: [hairColor as any],
                        glassesProbability: 100,
                        flip: true,
                        size: 80,
                      }).toString(),
                    )}`}
                  />
                </div>
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey='eyes'>
            <div className='my-2'>
              <div className='fs-5'>Ögon</div>
              <div className='fs-7 text-muted'>Välj ögon</div>
            </div>
            <div className='grid-avatar-creator mt-2'>
              {avatarOptions.eyes.map((eyeMap) => (
                <div key={eyeMap} className='d-flex flex-column align-items-center'>
                  <img
                    className={`${
                      eyeMap === eyes
                        ? "opacity-1 border-1 border-primary border rounded"
                        : "border border-transparent opacity-50"
                    }`}
                    onClick={() => setEyes(eyeMap)}
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      createAvatar(style, {
                        earrings: [earrings as any],
                        eyebrows: [eyebrows as any],
                        eyes: [eyeMap as any],
                        glasses: [glasses as any],
                        hair: [hair as any],
                        skinColor: [skinColor as any],
                        mouth: [mouth as any],
                        hairColor: [hairColor as any],
                        glassesProbability: 100,
                        flip: true,
                        size: 80,
                      }).toString(),
                    )}`}
                  />
                </div>
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey='skincolor'>
            <div className='my-2'>
              <div className='fs-5'>Hudfärg</div>
              <div className='fs-7 text-muted'>Välj hudfärg</div>
            </div>
            <div className='grid-avatar-creator mt-2'>
              {avatarOptions.skinColor.map((skinColorMap) => (
                <div key={skinColorMap} className='d-flex flex-column align-items-center'>
                  <img
                    className={`${
                      skinColor === skinColorMap
                        ? "opacity-1 border-1 border-primary border rounded"
                        : "border border-transparent opacity-50"
                    }`}
                    onClick={() => setSkinColor(skinColorMap)}
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      createAvatar(style, {
                        earrings: [earrings as any],
                        eyebrows: [eyebrows as any],
                        eyes: [eyes as any],
                        glasses: [glasses as any],
                        hair: [hair as any],
                        skinColor: [skinColorMap as any],
                        mouth: [mouth as any],
                        hairColor: [hairColor as any],
                        glassesProbability: 100,
                        flip: true,
                        size: 80,
                      }).toString(),
                    )}`}
                  />
                </div>
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey='mouth'>
            <div className='my-2'>
              <div className='fs-5'>Mun</div>
              <div className='fs-7 text-muted'>Välj mun</div>
            </div>
            <div className='grid-avatar-creator mt-2'>
              {avatarOptions.mouth.map((mouthMap) => (
                <div key={mouthMap} className='d-flex flex-column align-items-center'>
                  <img
                    className={`${
                      mouthMap === mouth
                        ? "opacity-1 border-1 border-primary border rounded"
                        : "border border-transparent opacity-50"
                    }`}
                    onClick={() => setMouth(mouthMap)}
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      createAvatar(style, {
                        earrings: [earrings as any],
                        eyebrows: [eyebrows as any],
                        eyes: [eyes as any],
                        glasses: [glasses as any],
                        hair: [hair as any],
                        skinColor: [skinColor as any],
                        mouth: [mouthMap as any],
                        hairColor: [hairColor as any],
                        glassesProbability: 100,
                        flip: true,
                        size: 80,
                      }).toString(),
                    )}`}
                  />
                </div>
              ))}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

export default CreateAvatar;
